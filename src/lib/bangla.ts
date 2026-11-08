const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]

// 25 → "২৫"
export function toBanglaNumber(value: number | string): string {
  return String(value).replace(/[0-9]/g, (digit) => banglaDigits[Number(digit)])
}

// "2026-11-09" → "সোমবার, ৯ নভেম্বর"
// তারিখটা স্থানীয় দিন হিসেবে পড়ি, যাতে সময় অঞ্চলের কারণে দিন বদলে না যায়
export function formatBanglaDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date)
}

// কখন তথ্য আনা হয়েছিল, সেটা দেখাতে: তারিখ আর সময় বাংলায়
// যেমন: "৯ নভেম্বর, ১৩:৫৫" (২৪ ঘণ্টার ঘড়ি, যাতে AM/PM ইংরেজিতে না আসে)
export function formatBanglaTime(timestamp: number): string {
  const date = new Date(timestamp)
  const day = new Intl.DateTimeFormat("bn-BD", { day: "numeric", month: "long" }).format(date)
  const time = new Intl.DateTimeFormat("bn-BD", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date)
  return `${day}, ${time}`
}
