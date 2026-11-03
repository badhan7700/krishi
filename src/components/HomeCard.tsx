import { Link } from "react-router"

type HomeCardProps = {
    emoji: string
    title: string
    to: string
}

function HomeCard({ emoji, title, to }: HomeCardProps) {
    return (
        <Link
            to={to}
            className="bg-white rounded-2xl p-6 flex items-center gap-4 hover:bg-green-100"
        >
            <div className="text-5xl">{emoji}</div>
            <p className="text-2xl font-bold">{title}</p>
        </Link>
    )
}

export default HomeCard