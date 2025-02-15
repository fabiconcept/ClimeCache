import StatCard from "../global components/StatCard";

export default function StatsCard({
    title,
    value,
    unit,
    Icon
}: {
    title: string,
    value: string,
    unit: string,
    Icon: React.ElementType
}) {

    return (
        <StatCard>
            <p className="title">{title}</p>
            <div className="row">
                <div className="info">
                    <div className="icon"><Icon /></div>
                    <div className="stat">
                        <span className="value">{value}<span>{unit}</span></span>
                    </div>
                </div>
            </div>
        </StatCard>
    )
}
