// বাংলাদেশের ৬৪ জেলা আর জেলা শহরের আনুমানিক অবস্থান (অক্ষাংশ, দ্রাঘিমাংশ)।
// কৃষককে টাইপ করতে হয় না, লিস্ট থেকে বেছে নিলেই হয়।

export type District = {
  id: string
  name: string
  division: string
  lat: number
  lon: number
}

export const districts: District[] = [
  // ঢাকা বিভাগ
  { id: "dhaka", name: "ঢাকা", division: "ঢাকা", lat: 23.81, lon: 90.41 },
  { id: "gazipur", name: "গাজীপুর", division: "ঢাকা", lat: 24.0, lon: 90.42 },
  { id: "narayanganj", name: "নারায়ণগঞ্জ", division: "ঢাকা", lat: 23.62, lon: 90.5 },
  { id: "narsingdi", name: "নরসিংদী", division: "ঢাকা", lat: 23.92, lon: 90.72 },
  { id: "manikganj", name: "মানিকগঞ্জ", division: "ঢাকা", lat: 23.86, lon: 90.0 },
  { id: "munshiganj", name: "মুন্সীগঞ্জ", division: "ঢাকা", lat: 23.54, lon: 90.53 },
  { id: "tangail", name: "টাঙ্গাইল", division: "ঢাকা", lat: 24.25, lon: 89.92 },
  { id: "kishoreganj", name: "কিশোরগঞ্জ", division: "ঢাকা", lat: 24.43, lon: 90.78 },
  { id: "faridpur", name: "ফরিদপুর", division: "ঢাকা", lat: 23.61, lon: 89.84 },
  { id: "gopalganj", name: "গোপালগঞ্জ", division: "ঢাকা", lat: 23.01, lon: 89.83 },
  { id: "madaripur", name: "মাদারীপুর", division: "ঢাকা", lat: 23.17, lon: 90.2 },
  { id: "rajbari", name: "রাজবাড়ী", division: "ঢাকা", lat: 23.76, lon: 89.64 },
  { id: "shariatpur", name: "শরীয়তপুর", division: "ঢাকা", lat: 23.21, lon: 90.35 },
  // চট্টগ্রাম বিভাগ
  { id: "chattogram", name: "চট্টগ্রাম", division: "চট্টগ্রাম", lat: 22.36, lon: 91.78 },
  { id: "coxsbazar", name: "কক্সবাজার", division: "চট্টগ্রাম", lat: 21.45, lon: 91.97 },
  { id: "cumilla", name: "কুমিল্লা", division: "চট্টগ্রাম", lat: 23.46, lon: 91.18 },
  { id: "feni", name: "ফেনী", division: "চট্টগ্রাম", lat: 23.02, lon: 91.4 },
  { id: "noakhali", name: "নোয়াখালী", division: "চট্টগ্রাম", lat: 22.87, lon: 91.1 },
  { id: "lakshmipur", name: "লক্ষ্মীপুর", division: "চট্টগ্রাম", lat: 22.94, lon: 90.83 },
  { id: "chandpur", name: "চাঁদপুর", division: "চট্টগ্রাম", lat: 23.23, lon: 90.65 },
  { id: "brahmanbaria", name: "ব্রাহ্মণবাড়িয়া", division: "চট্টগ্রাম", lat: 23.96, lon: 91.11 },
  { id: "rangamati", name: "রাঙ্গামাটি", division: "চট্টগ্রাম", lat: 22.65, lon: 92.18 },
  { id: "khagrachhari", name: "খাগড়াছড়ি", division: "চট্টগ্রাম", lat: 23.12, lon: 91.98 },
  { id: "bandarban", name: "বান্দরবান", division: "চট্টগ্রাম", lat: 22.2, lon: 92.22 },
  // রাজশাহী বিভাগ
  { id: "rajshahi", name: "রাজশাহী", division: "রাজশাহী", lat: 24.37, lon: 88.6 },
  { id: "natore", name: "নাটোর", division: "রাজশাহী", lat: 24.41, lon: 89.0 },
  { id: "naogaon", name: "নওগাঁ", division: "রাজশাহী", lat: 24.81, lon: 88.94 },
  { id: "chapainawabganj", name: "চাঁপাইনবাবগঞ্জ", division: "রাজশাহী", lat: 24.6, lon: 88.27 },
  { id: "pabna", name: "পাবনা", division: "রাজশাহী", lat: 24.01, lon: 89.24 },
  { id: "sirajganj", name: "সিরাজগঞ্জ", division: "রাজশাহী", lat: 24.45, lon: 89.7 },
  { id: "bogura", name: "বগুড়া", division: "রাজশাহী", lat: 24.85, lon: 89.37 },
  { id: "joypurhat", name: "জয়পুরহাট", division: "রাজশাহী", lat: 25.1, lon: 89.02 },
  // খুলনা বিভাগ
  { id: "khulna", name: "খুলনা", division: "খুলনা", lat: 22.82, lon: 89.55 },
  { id: "bagerhat", name: "বাগেরহাট", division: "খুলনা", lat: 22.65, lon: 89.79 },
  { id: "satkhira", name: "সাতক্ষীরা", division: "খুলনা", lat: 22.72, lon: 89.07 },
  { id: "jashore", name: "যশোর", division: "খুলনা", lat: 23.17, lon: 89.21 },
  { id: "jhenaidah", name: "ঝিনাইদহ", division: "খুলনা", lat: 23.54, lon: 89.15 },
  { id: "magura", name: "মাগুরা", division: "খুলনা", lat: 23.49, lon: 89.42 },
  { id: "narail", name: "নড়াইল", division: "খুলনা", lat: 23.17, lon: 89.51 },
  { id: "kushtia", name: "কুষ্টিয়া", division: "খুলনা", lat: 23.9, lon: 89.12 },
  { id: "chuadanga", name: "চুয়াডাঙ্গা", division: "খুলনা", lat: 23.64, lon: 88.84 },
  { id: "meherpur", name: "মেহেরপুর", division: "খুলনা", lat: 23.76, lon: 88.63 },
  // বরিশাল বিভাগ
  { id: "barishal", name: "বরিশাল", division: "বরিশাল", lat: 22.7, lon: 90.37 },
  { id: "bhola", name: "ভোলা", division: "বরিশাল", lat: 22.69, lon: 90.65 },
  { id: "patuakhali", name: "পটুয়াখালী", division: "বরিশাল", lat: 22.36, lon: 90.33 },
  { id: "pirojpur", name: "পিরোজপুর", division: "বরিশাল", lat: 22.58, lon: 89.97 },
  { id: "jhalokathi", name: "ঝালকাঠি", division: "বরিশাল", lat: 22.64, lon: 90.2 },
  { id: "barguna", name: "বরগুনা", division: "বরিশাল", lat: 22.15, lon: 90.12 },
  // সিলেট বিভাগ
  { id: "sylhet", name: "সিলেট", division: "সিলেট", lat: 24.89, lon: 91.87 },
  { id: "moulvibazar", name: "মৌলভীবাজার", division: "সিলেট", lat: 24.48, lon: 91.78 },
  { id: "habiganj", name: "হবিগঞ্জ", division: "সিলেট", lat: 24.37, lon: 91.42 },
  { id: "sunamganj", name: "সুনামগঞ্জ", division: "সিলেট", lat: 25.07, lon: 91.4 },
  // রংপুর বিভাগ
  { id: "rangpur", name: "রংপুর", division: "রংপুর", lat: 25.75, lon: 89.25 },
  { id: "dinajpur", name: "দিনাজপুর", division: "রংপুর", lat: 25.63, lon: 88.64 },
  { id: "thakurgaon", name: "ঠাকুরগাঁও", division: "রংপুর", lat: 26.03, lon: 88.46 },
  { id: "panchagarh", name: "পঞ্চগড়", division: "রংপুর", lat: 26.34, lon: 88.55 },
  { id: "nilphamari", name: "নীলফামারী", division: "রংপুর", lat: 25.93, lon: 88.86 },
  { id: "lalmonirhat", name: "লালমনিরহাট", division: "রংপুর", lat: 25.91, lon: 89.45 },
  { id: "kurigram", name: "কুড়িগ্রাম", division: "রংপুর", lat: 25.81, lon: 89.64 },
  { id: "gaibandha", name: "গাইবান্ধা", division: "রংপুর", lat: 25.33, lon: 89.53 },
  // ময়মনসিংহ বিভাগ
  { id: "mymensingh", name: "ময়মনসিংহ", division: "ময়মনসিংহ", lat: 24.75, lon: 90.41 },
  { id: "jamalpur", name: "জামালপুর", division: "ময়মনসিংহ", lat: 24.92, lon: 89.95 },
  { id: "sherpur", name: "শেরপুর", division: "ময়মনসিংহ", lat: 25.02, lon: 90.02 },
  { id: "netrokona", name: "নেত্রকোনা", division: "ময়মনসিংহ", lat: 24.88, lon: 90.73 },
]

export const divisions = [...new Set(districts.map((district) => district.division))]

export function getDistrictById(id: string): District | undefined {
  return districts.find((district) => district.id === id)
}

// ফোনের GPS থেকে পাওয়া অবস্থানের সবচেয়ে কাছের জেলা খোঁজা।
// ছোট দূরত্বে সাধারণ "পিথাগোরাস" হিসাবই যথেষ্ট; দ্রাঘিমাংশকে cos(অক্ষাংশ) দিয়ে ঠিক করি।
export function findNearestDistrict(lat: number, lon: number): District {
  const lonScale = Math.cos((lat * Math.PI) / 180)
  let nearest = districts[0]
  let bestDistance = Infinity
  for (const district of districts) {
    const dLat = district.lat - lat
    const dLon = (district.lon - lon) * lonScale
    const distance = dLat * dLat + dLon * dLon
    if (distance < bestDistance) {
      bestDistance = distance
      nearest = district
    }
  }
  return nearest
}
