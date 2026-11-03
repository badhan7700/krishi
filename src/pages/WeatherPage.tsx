import Layout from "../components/Layout"
import { Link } from "react-router"

function WeatherPage() {
    return (
        <Layout>
            <Link to="/" className="text-green-700 font-bold">← হোমে ফিরুন</Link>
            <h1 className="text-4xl font-bold text-green-700 mt-6 mb-6">☁️ আবহাওয়া</h1>
            <p className="text-lg text-gray-600">শীঘ্রই আসছে...</p>
        </Layout>
    )
}

export default WeatherPage