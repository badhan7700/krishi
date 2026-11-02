type HomeCardProps = {
    emoji: string
    title: string
}

function HomeCard({ emoji, title }: HomeCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6">
            <div className="text-5xl">{emoji}</div>
            <p className="text-2xl font-bold">{title}</p>
        </div>
    )
}

export default HomeCard