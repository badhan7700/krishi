function App() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-700">কৃষি</h1>
      <p className="text-lg text-gray-600">ফসল রক্ষায় আপনার ডিজিটাল সাথী</p>

      <div className="flex flex-col gap-4 mt-6">
        <div className="bg-white rounded-2xl p-6">
          <div className="text-5xl">☁️</div>
          <p className="text-2xl font-bold">আবহাওয়া</p>
        </div>
        <div className="bg-white rounded-2xl p-6">
          <div className="text-5xl">📦</div>
          <p className="text-2xl font-bold">সংরক্ষণ টিপস</p>
        </div>
        <div className="bg-white rounded-2xl p-6">
          <div className="text-5xl">🌾</div>
          <p className="text-2xl font-bold">আমার ফসল</p>
        </div>
      </div>
    </div>
  )
}

export default App
