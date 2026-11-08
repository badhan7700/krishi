import type { DayForecast } from "../lib/weather"
import { describeWeather } from "../lib/weather"
import { getDayAdvice, adviceToSpeech, type AdviceLevel } from "../lib/advice"
import { toBanglaNumber } from "../lib/bangla"
import SpeakButton from "./SpeakButton"

const levelStyles: Record<AdviceLevel, { box: string; icon: string }> = {
  good: { box: "bg-green-100 border-green-600", icon: "✅" },
  warn: { box: "bg-yellow-50 border-yellow-500", icon: "⚠️" },
  danger: { box: "bg-red-50 border-red-600", icon: "⛔" },
}

type TodayCardProps = {
  placeName: string
  day: DayForecast
}

function TodayCard({ placeName, day }: TodayCardProps) {
  const weather = describeWeather(day.weatherCode)
  const advice = getDayAdvice(day)
  const style = levelStyles[advice.level]

  return (
    <section className="rounded-2xl bg-white p-5" aria-labelledby="today-title">
      <h2 id="today-title" className="text-lg font-bold text-gray-600">
        আজ · {placeName}
      </h2>

      <div className="mt-2 flex items-center gap-4">
        <span className="text-7xl" aria-hidden="true">{weather.emoji}</span>
        <div>
          <p className="text-4xl font-bold text-gray-900">{toBanglaNumber(day.tempMax)}°</p>
          <p className="text-lg text-gray-600">{weather.label}</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-green-50 p-2">
          <dt className="text-sm text-gray-600">বৃষ্টি</dt>
          <dd className="text-xl font-bold">🌧️ {toBanglaNumber(day.rainChance)}%</dd>
        </div>
        <div className="rounded-xl bg-green-50 p-2">
          <dt className="text-sm text-gray-600">আর্দ্রতা</dt>
          <dd className="text-xl font-bold">💧 {toBanglaNumber(day.humidity)}%</dd>
        </div>
        <div className="rounded-xl bg-green-50 p-2">
          <dt className="text-sm text-gray-600">বাতাস</dt>
          <dd className="text-xl font-bold">
            💨 {toBanglaNumber(day.windMax)}
            <span className="block text-xs font-normal text-gray-600">কিমি/ঘণ্টা</span>
          </dd>
        </div>
      </dl>

      <div className={`mt-4 rounded-xl border-l-8 p-4 ${style.box}`}>
        <p className="text-xl font-bold text-gray-900">
          <span aria-hidden="true">{style.icon} </span>
          {advice.headline}
        </p>
        {advice.details.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1 text-lg text-gray-700">
            {advice.details.map((detail) => (
              <li key={detail}>• {detail}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <SpeakButton text={adviceToSpeech(placeName, day, advice)} />
      </div>
    </section>
  )
}

export default TodayCard
