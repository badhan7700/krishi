import { findNearestDistrict, getDistrictById } from "../data/districts"

// কৃষক কোন জায়গার আবহাওয়া দেখবেন: লিস্ট থেকে বাছা জেলা, নাকি ফোনের GPS।
export type Place =
  | { kind: "district"; districtId: string }
  | { kind: "gps"; lat: number; lon: number }

export type ResolvedPlace = {
  key: string // cache-এর জন্য আলাদা পরিচয়
  name: string // স্ক্রিনে দেখানোর নাম
  lat: number
  lon: number
}

// বাংলাদেশের মোটামুটি সীমানা
function isInBangladesh(lat: number, lon: number): boolean {
  return lat >= 20.5 && lat <= 26.7 && lon >= 88.0 && lon <= 92.7
}

export function resolvePlace(place: Place): ResolvedPlace | null {
  if (place.kind === "district") {
    const district = getDistrictById(place.districtId)
    if (!district) return null
    return { key: `district:${district.id}`, name: district.name, lat: district.lat, lon: district.lon }
  }

  const name = isInBangladesh(place.lat, place.lon)
    ? `আপনার এলাকা (${findNearestDistrict(place.lat, place.lon).name} জেলা)`
    : "আপনার এলাকা"
  return {
    key: `gps:${place.lat.toFixed(2)},${place.lon.toFixed(2)}`,
    name,
    lat: place.lat,
    lon: place.lon,
  }
}
