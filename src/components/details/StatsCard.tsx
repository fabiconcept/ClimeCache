import StatCard from "../global components/StatCard";

export default function StatsCard({
    title,
    value,
    unit,
    Icon, 
    iconClass
}: {
    title: string,
    value: string,
    unit: string,
    Icon: React.ElementType,
    iconClass?:string
}) {

    return (
        <StatCard title={`${title} ${value}${unit}`}>
            <p className="title">{title}</p>
            <div className="row">
                <div className="info">
                    <div className="icon"><Icon className={iconClass || ""} /></div>
                    <div className="stat">
                        <span className="value">{value}<span>{unit}</span></span>
                    </div>
                </div>
            </div>
        </StatCard>
    )
}
