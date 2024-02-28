import { SearchXIcon } from "lucide-react";

function NoResults() {
  return (
    <section className="py-10 md:py-12 lg:py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center">
        <SearchXIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
        <h2 className="mb-2 text-3xl font-bold leading-9 tracking-tight text-neutral-900 sm:text-5xl sm:leading-none lg:mb-4">
          Oh oh!
        </h2>
        <p className="mb-6 text-neutral-600">
          Unfortunately no results could be found. Please try another search
        </p>
      </div>
    </section>
  );
}

export default NoResults;
