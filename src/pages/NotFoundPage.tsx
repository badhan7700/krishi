import Layout from "../components/Layout"
import { Link } from "react-router"

function NotFoundPage() {
    return (
        <Layout>
            <Link to="/" className="text-green-700 font-bold">← হোমে ফিরুন</Link>
            <h1 className="text-4xl font-bold text-green-700 mt-6 mb-6">🤔 পেজটি পাওয়া যায়নি</h1>
            <p className="text-lg text-gray-600">আপনি যে পাতাটি খুঁজছেন সেটি নেই।</p>
        </Layout>
    )
}
export default NotFoundPage