import { Skeleton } from "@/components/ui/skeleton";

function LoadingResults() {
  return (
    <section>
      <div className="mx-auto max-w-7xl">
        <p className="animate-pulse pt-10 text-center font-bold text-primary">
          Please hold - we&apos;re soaring far and wide for the best jobs!
        </p>
      </div>

      <div className="flex justify-center py-10">
        <div className="h-10 w-10 animate-bounce rounded-full bg-primary"></div>
      </div>

      <div className="space-y-2 p-5">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="mx-auto flex max-w-7xl flex-col gap-4">
            {/* <Skeleton className="h-20 w-20 rounded-lg md:h-44 md:w-44" /> */}
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default LoadingResults;
