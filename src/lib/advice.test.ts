import { describe, expect, it } from "vitest"
import { getDayAdvice } from "./advice"
import type { DayForecast } from "./weather"

// একটা "সাধারণ ভালো দিন", প্রতিটা টেস্টে শুধু দরকারি জিনিসটা বদলাই
const sunnyDay: DayForecast = {
  date: "2026-11-09",
  weatherCode: 0,
  tempMax: 29,
  tempMin: 18,
  rainChance: 5,
  rainMm: 0,
  humidity: 60,
  windMax: 10,
}

describe("getDayAdvice", () => {
  it("says it is a good day to dry crops when dry and calm", () => {
    expect(getDayAdvice(sunnyDay).level).toBe("good")
  })

  it("warns strongly when rain is likely", () => {
    const advice = getDayAdvice({ ...sunnyDay, rainChance: 70 })
    expect(advice.level).toBe("danger")
    expect(advice.headline).toContain("শুকাতে দেবেন না")
  })

  it("treats heavy rain amount as danger even if probability is low", () => {
    expect(getDayAdvice({ ...sunnyDay, rainChance: 10, rainMm: 8 }).level).toBe("danger")
  })

  it("warns when rain is possible", () => {
    expect(getDayAdvice({ ...sunnyDay, rainChance: 40 }).level).toBe("warn")
  })

  it("warns on very humid days without rain", () => {
    expect(getDayAdvice({ ...sunnyDay, humidity: 90 }).level).toBe("warn")
  })

  it("adds a wind warning and downgrades a good day", () => {
    const advice = getDayAdvice({ ...sunnyDay, windMax: 45 })
    expect(advice.level).toBe("warn")
    expect(advice.details.some((d) => d.includes("বাতাস"))).toBe(true)
  })

  it("adds heat safety advice on hot days", () => {
    const advice = getDayAdvice({ ...sunnyDay, tempMax: 38 })
    expect(advice.details.some((d) => d.includes("গরম"))).toBe(true)
  })
})
