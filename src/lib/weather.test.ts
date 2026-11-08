import { describe, expect, it } from "vitest"
import { buildForecastUrl, describeWeather, parseForecast } from "./weather"
import { toBanglaNumber } from "./bangla"
import { findNearestDistrict, districts } from "../data/districts"

describe("buildForecastUrl", () => {
  it("asks Open-Meteo for 5 days in Bangladesh time", () => {
    const url = new URL(buildForecastUrl(23.8103, 90.4125))
    expect(url.searchParams.get("latitude")).toBe("23.81")
    expect(url.searchParams.get("timezone")).toBe("Asia/Dhaka")
    expect(url.searchParams.get("forecast_days")).toBe("5")
  })
})

describe("parseForecast", () => {
  it("turns the raw response into simple day objects with daytime humidity", () => {
    const hourlyTime = Array.from({ length: 24 }, (_, h) => `2026-11-09T${String(h).padStart(2, "0")}:00`)
    // রাতে ৯৫%, দিনে ৬০%: গড় শুধু দিনের হওয়া উচিত
    const humidity = hourlyTime.map((_, h) => (h >= 6 && h < 18 ? 60 : 95))

    const days = parseForecast({
      daily: {
        time: ["2026-11-09"],
        weather_code: [61],
        temperature_2m_max: [29.6],
        temperature_2m_min: [18.2],
        precipitation_probability_max: [null],
        precipitation_sum: [1.2],
        wind_speed_10m_max: [12.4],
      },
      hourly: { time: hourlyTime, relative_humidity_2m: humidity },
    })

    expect(days).toEqual([
      {
        date: "2026-11-09",
        weatherCode: 61,
        tempMax: 30,
        tempMin: 18,
        rainChance: 0,
        rainMm: 1.2,
        humidity: 60,
        windMax: 12,
      },
    ])
  })
})

describe("describeWeather", () => {
  it("maps WMO codes to Bangla labels", () => {
    expect(describeWeather(0).label).toBe("রোদ ঝলমলে")
    expect(describeWeather(63).label).toBe("বৃষ্টি")
    expect(describeWeather(95).label).toBe("বজ্রসহ বৃষ্টি")
  })
})

describe("toBanglaNumber", () => {
  it("converts digits", () => {
    expect(toBanglaNumber(2026)).toBe("২০২৬")
    expect(toBanglaNumber("12.5")).toBe("১২.৫")
  })
})

describe("districts", () => {
  it("has all 64 districts with unique ids", () => {
    expect(districts).toHaveLength(64)
    expect(new Set(districts.map((d) => d.id)).size).toBe(64)
  })

  it("finds the nearest district from GPS", () => {
    expect(findNearestDistrict(24.9, 91.86).id).toBe("sylhet")
    expect(findNearestDistrict(22.35, 91.8).id).toBe("chattogram")
  })
})
