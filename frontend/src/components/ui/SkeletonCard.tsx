export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden animate-pulse">
      <div className="h-3 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:700px_100%] animate-shimmer" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-5 w-3/4 rounded-lg bg-gray-200" />
        <div className="h-4 w-1/2 rounded-lg bg-gray-100" />
        <div className="flex gap-2 mt-1">
          <div className="h-5 w-16 rounded-full bg-gray-100" />
          <div className="h-5 w-20 rounded-full bg-gray-100" />
          <div className="h-5 w-14 rounded-full bg-gray-100" />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="h-6 w-24 rounded-lg bg-gray-200" />
          <div className="h-5 w-20 rounded-lg bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
