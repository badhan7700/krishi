import { Link } from "react-router"
import Layout from "../components/Layout"
import BackLink from "../components/BackLink"
import { tips } from "../data/tips"

function TipsPage() {
  return (
    <Layout>
      <BackLink />
      <h1 className="mt-4 text-4xl font-bold text-green-700">📦 সংরক্ষণ টিপস</h1>
      <p className="mt-2 text-lg text-gray-600">ফসল কাটার পর ক্ষতি কমানোর সহজ উপায়</p>

      <ul className="mt-6 flex flex-col gap-4">
        {tips.map((tip) => (
          <li key={tip.slug}>
            <Link
              to={`/tips/${tip.slug}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-5 hover:bg-green-100"
            >
              <span className="text-5xl" aria-hidden="true">{tip.emoji}</span>
              <span>
                <span className="block text-xl font-bold text-gray-900">{tip.title}</span>
                <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-0.5 text-sm text-green-800">
                  {tip.crop}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default TipsPage
