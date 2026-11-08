// localStorage নিরাপদে ব্যবহার করা।
// কিছু ব্রাউজারে (প্রাইভেট মোড ইত্যাদি) localStorage কাজ করে না বা error দেয়,
// তাই সব জায়গায় try/catch দিয়ে মুড়ে রাখি, যাতে অ্যাপ ভেঙে না পড়ে।

export function loadJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function saveJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // জায়গা না থাকলে বা বন্ধ থাকলে চুপচাপ বাদ দিই, শুধু পরের বার cache পাওয়া যাবে না
  }
}
