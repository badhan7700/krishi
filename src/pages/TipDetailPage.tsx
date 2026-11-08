import { useParams } from "react-router"
import Layout from "../components/Layout"
import BackLink from "../components/BackLink"
import SpeakButton from "../components/SpeakButton"
import { getTipBySlug, tipToSpeech } from "../data/tips"
import NotFoundPage from "./NotFoundPage"

function TipDetailPage() {
  // ঠিকানা /tips/dhan-shukano হলে slug = "dhan-shukano"
  const { slug } = useParams()
  const tip = slug ? getTipBySlug(slug) : undefined

  if (!tip) return <NotFoundPage />

  return (
    <Layout>
      <BackLink to="/tips" label="সব টিপস" />

      <div className="mt-4 text-6xl" aria-hidden="true">{tip.emoji}</div>
      <h1 className="mt-2 text-3xl font-bold text-green-700">{tip.title}</h1>
      <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-0.5 text-sm text-green-800">
        {tip.crop}
      </span>
      <p className="mt-4 text-lg text-gray-700">{tip.summary}</p>

      <div className="mt-6">
        <SpeakButton text={tipToSpeech(tip)} />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {tip.sections.map((section) => (
          <section key={section.heading} className="rounded-2xl bg-white p-5">
            <h2 className="text-xl font-bold text-gray-900">{section.heading}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {section.points.map((point) => (
                <li key={point} className="flex gap-3 text-lg text-gray-700">
                  <span className="text-green-700" aria-hidden="true">✔</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-6 rounded-2xl bg-yellow-50 p-4 text-base text-gray-700">
        ⚠️ এগুলো সাধারণ পরামর্শ। নিশ্চিত হতে আপনার এলাকার উপসহকারী কৃষি কর্মকর্তার সাথে কথা বলুন।
      </p>
    </Layout>
  )
}

export default TipDetailPage
