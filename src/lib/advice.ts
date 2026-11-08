import type { DayForecast } from "./weather"
import { toBanglaNumber } from "./bangla"

// আবহাওয়ার সংখ্যা থেকে কৃষকের জন্য সহজ বাংলা পরামর্শ।
// নিয়মগুলো ইচ্ছা করেই সাবধানী: সন্দেহ থাকলে "শুকাতে দেবেন না" বলাই নিরাপদ।

export type AdviceLevel = "good" | "warn" | "danger"

export type DayAdvice = {
  level: AdviceLevel
  headline: string // সবচেয়ে জরুরি কথা, এক লাইনে
  details: string[] // বাড়তি পরামর্শ
}

export const THRESHOLDS = {
  rainLikely: 60, // %: এর বেশি হলে বৃষ্টি প্রায় নিশ্চিত ধরি
  rainPossible: 30, // %: এর বেশি হলে বৃষ্টি হতে পারে
  heavyRainMm: 5, // মিমি: এর বেশি হলে বৃষ্টি উল্লেখযোগ্য
  humid: 85, // %: এর বেশি হলে ফসল শুকাতে কষ্ট
  hot: 36, // °C
  windy: 40, // কিমি/ঘণ্টা
}

export function getDayAdvice(day: DayForecast): DayAdvice {
  const details: string[] = []
  let level: AdviceLevel
  let headline: string

  const rainLikely = day.rainChance >= THRESHOLDS.rainLikely || day.rainMm >= THRESHOLDS.heavyRainMm
  const rainPossible = day.rainChance >= THRESHOLDS.rainPossible

  if (rainLikely) {
    level = "danger"
    headline = "বৃষ্টির সম্ভাবনা বেশি। আজ ফসল বাইরে শুকাতে দেবেন না।"
    details.push("শুকানো ফসল ঢেকে উঁচু জায়গায় রাখুন।")
    details.push("পলিথিন বা ত্রিপল হাতের কাছে রাখুন।")
  } else if (rainPossible) {
    level = "warn"
    headline = "বৃষ্টি হতে পারে। শুকাতে দিলে কাছাকাছি থাকুন।"
    details.push("আকাশ কালো হলেই ফসল জড়ো করে ঢেকে দিন।")
  } else if (day.humidity >= THRESHOLDS.humid) {
    level = "warn"
    headline = "বৃষ্টি নেই, তবে বাতাসে আর্দ্রতা বেশি। শুকাতে বেশি সময় লাগবে।"
    details.push("বিকেলের আগেই ফসল তুলে ঢেকে রাখুন।")
  } else {
    level = "good"
    headline = "ফসল শুকানোর জন্য ভালো দিন।"
    details.push("পাতলা করে বিছিয়ে এক-দুই ঘণ্টা পর পর উল্টে দিন।")
  }

  if (day.windMax >= THRESHOLDS.windy) {
    if (level === "good") level = "warn"
    details.push("জোরে বাতাস হতে পারে। ত্রিপল বা পলিথিনের কোণ ভারী কিছু দিয়ে চাপা দিন।")
  }

  if (day.tempMax >= THRESHOLDS.hot) {
    details.push("খুব গরম। দুপুরে ছায়ায় বিশ্রাম নিন আর বেশি করে পানি পান করুন।")
    details.push("রোদ থেকে তোলা গরম ফসল ঠান্ডা না করে বস্তায় ভরবেন না।")
  }

  return { level, headline, details }
}

// 🔊 বাটনের জন্য পুরো পরামর্শ এক লেখায়
export function adviceToSpeech(placeName: string, day: DayForecast, advice: DayAdvice): string {
  return [
    `${placeName}, আজকের আবহাওয়া।`,
    `সর্বোচ্চ তাপমাত্রা ${toBanglaNumber(day.tempMax)} ডিগ্রি।`,
    `বৃষ্টির সম্ভাবনা ${toBanglaNumber(day.rainChance)} শতাংশ।`,
    advice.headline,
    ...advice.details,
  ].join(" ")
}
