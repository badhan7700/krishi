import HomeCard from "./components/HomeCard"


function App() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-700">কৃষি</h1>
      <p className="text-lg text-gray-600">ফসল রক্ষায় আপনার ডিজিটাল সাথী</p>

      <div className="flex flex-col gap-4 mt-6">
        <HomeCard emoji="☁️" title="আবহাওয়া" />
        <HomeCard emoji="📦" title="সংরক্ষণ টিপস" />
        <HomeCard emoji="🌾" title="আমার ফসল" />
      </div>
    </div>
  )
}

export default App
