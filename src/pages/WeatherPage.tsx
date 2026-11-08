import { useState } from "react"
import Layout from "../components/Layout"
import BackLink from "../components/BackLink"
import LocationPicker from "../components/LocationPicker"
import TodayCard from "../components/TodayCard"
import ForecastRow from "../components/ForecastRow"
import { useForecast } from "../hooks/useForecast"
import { resolvePlace, type Place } from "../lib/place"
import { loadJSON, saveJSON } from "../lib/storage"
import { formatBanglaTime } from "../lib/bangla"

const PLACE_KEY = "krishi_place"

function WeatherPage() {
  // শেষবার যে জায়গা বেছেছিলেন, সেটা মনে রাখি, যাতে প্রতিবার বাছতে না হয়
  const [place, setPlace] = useState<Place | null>(() => loadJSON<Place>(PLACE_KEY))
  const [gpsStatus, setGpsStatus] = useState<"idle" | "locating" | "error">("idle")
  const [retryCount, setRetryCount] = useState(0)

  const resolved = place ? resolvePlace(place) : null
  const { result, loading } = useForecast(resolved, retryCount)

  const choosePlace = (next: Place) => {
    setPlace(next)
    saveJSON(PLACE_KEY, next)
  }

  const handleUseGps = () => {
    if (!("geolocation" in navigator)) {
      setGpsStatus("error")
      return
    }
    setGpsStatus("locating")
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsStatus("idle")
        choosePlace({ kind: "gps", lat: position.coords.latitude, lon: position.coords.longitude })
      },
      () => setGpsStatus("error"),
      { timeout: 15000, maximumAge: 10 * 60 * 1000 },
    )
  }

  const days = result?.days ?? null

  return (
    <Layout>
      <BackLink />
      <h1 className="mt-4 text-4xl font-bold text-green-700">☁️ আবহাওয়া</h1>
      <p className="mt-2 text-lg text-gray-600">আজ ফসল শুকাতে দেবেন কিনা, এক নজরে দেখুন</p>

      <div className="mt-6">
        <LocationPicker
          selectedDistrictId={place?.kind === "district" ? place.districtId : ""}
          onSelectDistrict={(districtId) => choosePlace({ kind: "district", districtId })}
          onUseGps={handleUseGps}
          gpsStatus={gpsStatus}
        />
      </div>

      {resolved && (
        <div className="mt-6 flex flex-col gap-4" aria-live="polite">
          {loading && (
            <p className="rounded-2xl bg-white p-4 text-lg text-gray-700">⏳ আবহাওয়ার তথ্য আনা হচ্ছে…</p>
          )}

          {!loading && result?.offline && (
            <div className="rounded-2xl bg-yellow-50 p-4 text-lg text-gray-800" role="alert">
              {days ? (
                <p>📶 ইন্টারনেট পাওয়া যায়নি। শেষবারের তথ্য দেখানো হচ্ছে।</p>
              ) : (
                <p>📶 আবহাওয়ার তথ্য আনা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</p>
              )}
              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
                className="mt-3 min-h-12 rounded-xl bg-green-700 px-5 font-bold text-white hover:bg-green-800"
              >
                🔄 আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {days && days.length > 0 && (
            <>
              <TodayCard placeName={resolved.name} day={days[0]} />

              <h2 className="mt-2 text-2xl font-bold text-gray-900">সামনের দিনগুলো</h2>
              <ul className="flex flex-col gap-3">
                {days.slice(1).map((day) => (
                  <ForecastRow key={day.date} day={day} />
                ))}
              </ul>

              {result?.fetchedAt && (
                <p className="text-sm text-gray-500">সর্বশেষ আপডেট: {formatBanglaTime(result.fetchedAt)}</p>
              )}
            </>
          )}
        </div>
      )}

      <p className="mt-8 text-sm text-gray-500">
        আবহাওয়ার তথ্য:{" "}
        <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="underline">
          Open-Meteo.com
        </a>
      </p>
    </Layout>
  )
}

export default WeatherPage
