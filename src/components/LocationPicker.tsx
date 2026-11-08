import { districts, divisions } from "../data/districts"

type LocationPickerProps = {
  selectedDistrictId: string // GPS ব্যবহার করলে ""
  onSelectDistrict: (districtId: string) => void
  onUseGps: () => void
  gpsStatus: "idle" | "locating" | "error"
}

function LocationPicker({ selectedDistrictId, onSelectDistrict, onUseGps, gpsStatus }: LocationPickerProps) {
  return (
    <div className="rounded-2xl bg-white p-5">
      <label htmlFor="district" className="block text-lg font-bold text-gray-900">
        আপনার জেলা বেছে নিন
      </label>
      <select
        id="district"
        value={selectedDistrictId}
        onChange={(event) => onSelectDistrict(event.target.value)}
        className="mt-2 min-h-14 w-full rounded-xl border-2 border-green-200 bg-white px-4 text-lg"
      >
        <option value="" disabled>
          জেলা বাছুন…
        </option>
        {divisions.map((division) => (
          <optgroup key={division} label={`${division} বিভাগ`}>
            {districts
              .filter((district) => district.division === division)
              .map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>

      <p className="my-3 text-center text-gray-500">অথবা</p>

      <button
        type="button"
        onClick={onUseGps}
        disabled={gpsStatus === "locating"}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-green-700 px-4 text-lg font-bold text-green-800 hover:bg-green-50 disabled:opacity-60"
      >
        <span aria-hidden="true">📍</span>
        {gpsStatus === "locating" ? "অবস্থান খোঁজা হচ্ছে…" : "আমার এলাকা ব্যবহার করুন"}
      </button>
      {gpsStatus === "error" && (
        <p className="mt-2 text-base text-red-700" role="alert">
          অবস্থান পাওয়া যায়নি। ফোনের লোকেশন চালু করুন, অথবা লিস্ট থেকে জেলা বেছে নিন।
        </p>
      )}
    </div>
  )
}

export default LocationPicker
