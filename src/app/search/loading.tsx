import { Skeleton } from "@/components/ui/skeleton";

function LoadingResults() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col justify-between gap-6 bg-white px-6 py-6 md:flex-row md:py-10 lg:py-16 xl:py-16">
      <div className="space-y-6 md:w-2/3">
        <div className="flex w-full justify-between self-start">
          <Skeleton className="h-10 w-48 rounded-lg" />
        </div>
        <div className="w-full space-y-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="mx-auto flex max-w-7xl flex-col gap-4">
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full space-y-6 md:w-1/3">
        <Skeleton className="h-10 w-48 rounded-lg" />
        <div className="">
          <Skeleton className="h-60 w-full rounded-lg" />
        </div>
      </div>
    </section>
  );
}

export default LoadingResults;
