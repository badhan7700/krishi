import type { DayForecast } from "../lib/weather"
import { describeWeather } from "../lib/weather"
import { getDayAdvice, type AdviceLevel } from "../lib/advice"
import { formatBanglaDate, toBanglaNumber } from "../lib/bangla"

const dotColor: Record<AdviceLevel, string> = {
  good: "bg-green-600",
  warn: "bg-yellow-500",
  danger: "bg-red-600",
}

type ForecastRowProps = {
  day: DayForecast
}

function ForecastRow({ day }: ForecastRowProps) {
  const weather = describeWeather(day.weatherCode)
  const advice = getDayAdvice(day)

  return (
    <li className="rounded-2xl bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="text-4xl" aria-hidden="true">{weather.emoji}</span>
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-900">{formatBanglaDate(day.date)}</p>
          <p className="text-gray-600">
            {weather.label} · 🌧️ {toBanglaNumber(day.rainChance)}%
          </p>
        </div>
        <p className="text-right text-lg">
          <span className="font-bold">{toBanglaNumber(day.tempMax)}°</span>
          <span className="text-gray-500"> / {toBanglaNumber(day.tempMin)}°</span>
        </p>
      </div>
      <p className="mt-2 flex items-start gap-2 text-base text-gray-700">
        <span className={`mt-2 h-3 w-3 shrink-0 rounded-full ${dotColor[advice.level]}`} aria-hidden="true" />
        {advice.headline}
      </p>
    </li>
  )
}

export default ForecastRow
