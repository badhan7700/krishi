import Layout from "../components/Layout"
import BackLink from "../components/BackLink"

function MyCropsPage() {
  return (
    <Layout>
      <BackLink />
      <h1 className="mt-4 text-4xl font-bold text-green-700">🌾 আমার ফসল</h1>
      <p className="mt-2 text-lg text-gray-600">শীঘ্রই আসছে…</p>

      <div className="mt-6 rounded-2xl bg-white p-5 text-lg text-gray-700">
        <p>এখানে আপনি নিজের ফসলের হিসাব রাখতে পারবেন:</p>
        <ul className="mt-3 flex flex-col gap-2">
          <li>🌾 কোন ফসল, কত মণ, কোথায় রাখা</li>
          <li>📉 কোন বস্তায় কত মণ নষ্ট হলো, আর কেন</li>
          <li>📱 মোবাইল নম্বর আর পিন দিয়ে লগইন</li>
        </ul>
      </div>
    </Layout>
  )
}

export default MyCropsPage
