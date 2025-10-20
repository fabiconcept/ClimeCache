export default function StatCard({ children, title }: { children: React.ReactNode, title?: string }) {
    return (
        <div title={title ?? ""} className="stat-card animate-wrapper">
            {children}
        </div>
    )
}
