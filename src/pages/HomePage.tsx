import HomeCard from "../components/HomeCard"
import Layout from "../components/Layout"

function HomePage() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-green-700">কৃষি</h1>
      <p className="text-lg text-gray-600 mt-6 mb-6">ফসল রক্ষায় আপনার ডিজিটাল সাথী</p>

      <div className="flex flex-col gap-4 mt-6">
        <HomeCard to="/weather" emoji="☁️" title="আবহাওয়া" />
        <HomeCard to="/tips" emoji="📦" title="সংরক্ষণ টিপস" />
        <HomeCard to="/my-crops" emoji="🌾" title="আমার ফসল" />
      </div>
    </Layout>
  )
}

export default HomePage
