import { useEffect, useState } from "react"
import { fetchForecast, type DayForecast } from "../lib/weather"
import { loadJSON, saveJSON } from "../lib/storage"
import type { ResolvedPlace } from "../lib/place"

const CACHE_KEY = "krishi_forecast_cache"

type CachedForecast = {
  key: string
  days: DayForecast[]
  fetchedAt: number
}

export type ForecastResult = {
  days: DayForecast[] | null
  fetchedAt: number | null
  offline: boolean // নেট থেকে আনা যায়নি, পুরনো তথ্য দেখানো হচ্ছে
}

type Settled = ForecastResult & { request: string }

function readCache(key: string): CachedForecast | null {
  const cached = loadJSON<CachedForecast>(CACHE_KEY)
  return cached && cached.key === key ? cached : null
}

// জায়গা বদলালে বা "আবার চেষ্টা" চাপলে নতুন পূর্বাভাস আনে।
// নেট না থাকলে শেষবার সেভ করা পূর্বাভাস দেখায়, যাতে গ্রামে দুর্বল নেটেও কাজে লাগে।
export function useForecast(place: ResolvedPlace | null, retryCount: number) {
  // কোন জায়গার, কততম চেষ্টা: এই অনুরোধটা শেষ হয়েছে কিনা মেলানোর জন্য
  const request = place ? `${place.key}#${retryCount}` : ""
  const [settled, setSettled] = useState<Settled | null>(null)

  useEffect(() => {
    if (!place) return

    const controller = new AbortController()
    const key = place.key
    const thisRequest = `${key}#${retryCount}`

    fetchForecast(place.lat, place.lon, controller.signal)
      .then((days) => {
        const fetchedAt = Date.now()
        saveJSON(CACHE_KEY, { key, days, fetchedAt } satisfies CachedForecast)
        setSettled({ request: thisRequest, days, fetchedAt, offline: false })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return // জায়গা বদলে গেছে, পুরনো অনুরোধ বাদ
        console.error(error)
        const cached = readCache(key)
        setSettled({
          request: thisRequest,
          days: cached?.days ?? null,
          fetchedAt: cached?.fetchedAt ?? null,
          offline: true,
        })
      })

    return () => controller.abort()
    // place.key-এর ভেতরেই lat/lon আছে, তাই key বদলালেই নতুন করে আনি
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place?.key, retryCount])

  const loading = place !== null && settled?.request !== request

  // এই জায়গার তথ্য: আনা শেষ হলে সেটা, নাহলে (আনা চলাকালীন) সেভ করা পুরনোটা
  let result: ForecastResult | null = null
  if (place) {
    if (settled && settled.request.startsWith(`${place.key}#`)) {
      result = settled
    } else {
      const cached = readCache(place.key)
      if (cached) result = { days: cached.days, fetchedAt: cached.fetchedAt, offline: false }
    }
  }

  return { result, loading }
}
