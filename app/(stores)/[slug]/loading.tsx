export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl p-6 animate-pulse">
      <div className="h-8 w-48 bg-bg-muted rounded-lg mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 bg-bg-muted rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
