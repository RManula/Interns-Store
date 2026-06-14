export default function Loading() {
  return (
    <div className="min-h-screen bg-white pb-24 pt-32">
      <div className="container-shell animate-pulse">
        <div className="h-5 w-40 rounded-full bg-blue-100" />
        <div className="mt-7 h-16 max-w-3xl rounded-2xl bg-blue-50" />
        <div className="mt-4 h-16 max-w-2xl rounded-2xl bg-blue-50" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-72 rounded-[2rem] bg-surface" />)}
        </div>
      </div>
    </div>
  );
}
