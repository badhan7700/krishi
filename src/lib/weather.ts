// Open-Meteo থেকে আবহাওয়ার পূর্বাভাস আনা।
// Open-Meteo ফ্রি, আর API key লাগে না, তাই কোডে কোনো গোপন তথ্য রাখতে হয় না।
// তথ্যসূত্র: https://open-meteo.com (CC BY 4.0)

export type DayForecast = {
  date: string // "2026-11-09"
  weatherCode: number
  tempMax: number // °C
  tempMin: number // °C
  rainChance: number // বৃষ্টির সম্ভাবনা, %
  rainMm: number // মোট বৃষ্টি, মিলিমিটার
  humidity: number // দিনের বেলার গড় আর্দ্রতা, %
  windMax: number // সর্বোচ্চ বাতাস, কিমি/ঘণ্টা
}

const API_URL = "https://api.open-meteo.com/v1/forecast"
export const FORECAST_DAYS = 5

// Open-Meteo-র উত্তর দেখতে কেমন (শুধু যেটুকু আমরা ব্যবহার করি)
type OpenMeteoResponse = {
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_probability_max: (number | null)[]
    precipitation_sum: (number | null)[]
    wind_speed_10m_max: number[]
  }
  hourly: {
    time: string[]
    relative_humidity_2m: (number | null)[]
  }
}

export function buildForecastUrl(lat: number, lon: number): string {
  const params = new URLSearchParams({
    latitude: lat.toFixed(2),
    longitude: lon.toFixed(2),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "precipitation_sum",
      "wind_speed_10m_max",
    ].join(","),
    hourly: "relative_humidity_2m",
    timezone: "Asia/Dhaka",
    forecast_days: String(FORECAST_DAYS),
  })
  return `${API_URL}?${params}`
}

// কাঁচা উত্তর থেকে আমাদের নিজেদের সহজ গঠন বানানো
export function parseForecast(data: OpenMeteoResponse): DayForecast[] {
  const { daily, hourly } = data

  return daily.time.map((date, i) => {
    // দিনের বেলার (সকাল ৬টা থেকে সন্ধ্যা ৬টা) আর্দ্রতার গড়, কারণ ফসল তখনই শুকানো হয়
    const dayHumidity = hourly.time
      .map((time, h) => ({ time, value: hourly.relative_humidity_2m[h] }))
      .filter(({ time, value }) => {
        const hour = Number(time.slice(11, 13))
        return time.startsWith(date) && hour >= 6 && hour < 18 && value !== null
      })
      .map(({ value }) => value as number)

    const humidity =
      dayHumidity.length > 0
        ? dayHumidity.reduce((sum, value) => sum + value, 0) / dayHumidity.length
        : 0

    return {
      date,
      weatherCode: daily.weather_code[i],
      tempMax: Math.round(daily.temperature_2m_max[i]),
      tempMin: Math.round(daily.temperature_2m_min[i]),
      rainChance: daily.precipitation_probability_max[i] ?? 0,
      rainMm: daily.precipitation_sum[i] ?? 0,
      humidity: Math.round(humidity),
      windMax: Math.round(daily.wind_speed_10m_max[i]),
    }
  })
}

export async function fetchForecast(
  lat: number,
  lon: number,
  signal?: AbortSignal,
): Promise<DayForecast[]> {
  const response = await fetch(buildForecastUrl(lat, lon), { signal })
  if (!response.ok) {
    throw new Error(`Open-Meteo error: ${response.status}`)
  }
  const data = (await response.json()) as OpenMeteoResponse
  if (!data.daily?.time?.length || !data.hourly?.time) {
    throw new Error("Open-Meteo: unexpected response")
  }
  return parseForecast(data)
}

// WMO আবহাওয়া কোড → ইমোজি আর সহজ বাংলা নাম
// https://open-meteo.com/en/docs (WMO Weather interpretation codes)
export function describeWeather(code: number): { emoji: string; label: string } {
  if (code === 0) return { emoji: "☀️", label: "রোদ ঝলমলে" }
  if (code <= 2) return { emoji: "🌤️", label: "হালকা মেঘ" }
  if (code === 3) return { emoji: "☁️", label: "মেঘলা" }
  if (code === 45 || code === 48) return { emoji: "🌫️", label: "কুয়াশা" }
  if (code >= 51 && code <= 57) return { emoji: "🌦️", label: "গুঁড়ি গুঁড়ি বৃষ্টি" }
  if (code >= 61 && code <= 67) return { emoji: "🌧️", label: "বৃষ্টি" }
  if (code >= 80 && code <= 82) return { emoji: "🌧️", label: "থেমে থেমে বৃষ্টি" }
  if (code >= 95) return { emoji: "⛈️", label: "বজ্রসহ বৃষ্টি" }
  return { emoji: "🌥️", label: "মেঘলা" }
}
