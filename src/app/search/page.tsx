export const maxDuration = 300;

import { fetchJobs } from "@/lib/fetchJobs";
import { notFound } from "next/navigation";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, SearchIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { cn, formatDescriptions } from "@/lib/utils";
import { PaginationProps, SearchPageProps } from "../../../typings";
import NoResults from "@/components/no-results";

const START_PARAM = 10;

const generatePaginationLinks = ({
  searchParams,
  totalItems,
}: PaginationProps) => {
  const totalPages = Math.ceil(Number(totalItems) / START_PARAM);

  const links = [];
  for (let i = 1; i <= totalPages; i++) {
    const start = (i - 1) * START_PARAM;
    links.push(
      <PaginationItem key={i}>
        <PaginationLink
          href={`/search?url=${searchParams.url}&l=${searchParams.l}&start=${start}`}
        >
          {i}
        </PaginationLink>
      </PaginationItem>,
    );
  }
  return links;
};

async function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.url) {
    return notFound();
  }

  const results = await fetchJobs(searchParams);

  if (
    !results ||
    !results?.content?.jobs?.length ||
    results?.content?.jobs?.length === 0
  ) {
    return <NoResults />;
  }

  const { jobs, total_jobs, related_jobs, title } = results.content;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_SCRAPING_URL;
  const startParam = searchParams.start ? Number(searchParams.start) : 0;

  const getPreviousPageUrl = () => {
    const start = Math.max(0, startParam - START_PARAM);
    return `/search?url=${searchParams.url}&l=${searchParams.l}${start !== 0 ? `&start=${start}&radius=50` : "&radius=50"}`;
  };

  const getNextPageUrl = () => {
    const start = startParam + START_PARAM;
    return `/search?url=${searchParams.url}&l=${searchParams.l}&start=${start}&radius=50`;
  };

  return (
    <section className="mx-auto flex max-w-7xl flex-col justify-between gap-6 bg-white px-6 py-6 md:flex-row md:py-10 lg:py-16 xl:py-16">
      <div className={cn("w-full", related_jobs && "md:w-2/3")}>
        <div className="mb-6 flex items-center justify-between gap-2">
          <h2 className="text-lg font-bold tracking-tight text-neutral-800">
            {total_jobs} found
          </h2>
          <a
            className="group text-sm underline underline-offset-4 transition-colors duration-300 hover:text-secondary-foreground/90"
            href={`${searchParams.url}&l=${searchParams.l}${startParam !== 0 ? `&start=${startParam}&radius=50` : "&radius=50"}`}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
          >
            <span className="flex items-center justify-center gap-2">
              See original
              <span className="sr-only">{title}</span>
              <ExternalLinkIcon className="h-4 w-4 shrink-0 rounded-sm " />
            </span>
          </a>
        </div>
        <ul className="mb-6 flex flex-col gap-4">
          {jobs.map((job, i) => (
            <li key={job.link} className="">
              <Link
                href={baseUrl + job.link}
                className="group flex flex-col justify-between  rounded-lg border bg-white p-5 text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="mb-1 flex items-start justify-between gap-3 ">
                  <h3 className="min-w-[1%] break-words text-base font-bold group-hover:text-primary">
                    {job.title}
                  </h3>
                  <ExternalLinkIcon className="h-6 w-6 shrink-0 rounded-sm text-secondary-foreground/50 transition-colors duration-300 group-hover:text-primary" />
                </div>
                <ul className="mb-2 flex flex-row flex-wrap gap-2 text-sm text-secondary-foreground/90">
                  <li className="flex items-center gap-2 font-medium text-secondary-foreground">
                    {job.company}
                    {job.rating != null && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 text-secondary-foreground/90"
                      >
                        <span className="sr-only">
                          Rating is {job.rating} out of 5 stars
                        </span>
                        {job.rating}
                        <StarIcon
                          strokeWidth="0"
                          className="h-3 w-3 fill-current text-secondary-foreground/80"
                        />
                      </Badge>
                    )}
                  </li>
                  {job.metadata?.map((metadata, i) => (
                    <li key={metadata}>
                      <Badge>{metadata}</Badge>
                    </li>
                  ))}
                </ul>
                <ul className="mb-3 ml-5 max-w-[50ch] list-disc break-words leading-normal text-secondary-foreground/80">
                  {formatDescriptions(job.description).map((description, i) => (
                    <li key={i}>{description}</li>
                  ))}
                </ul>
                <div className="flex items-end justify-between gap-4 text-sm text-secondary-foreground/70">
                  <span>{job.location}</span>
                  <span>{job.date}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={getPreviousPageUrl()} />
            </PaginationItem>
            {generatePaginationLinks({
              searchParams,
              totalItems: total_jobs,
            })}
            <PaginationItem>
              <PaginationNext href={getNextPageUrl()} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {related_jobs && (
        <div className="w-full md:w-1/3">
          <h2 className="mb-[1.35rem] text-lg font-bold tracking-tight text-neutral-800">
            People also searched
          </h2>
          <ul className="flex flex-wrap gap-2">
            {related_jobs.map((title) => (
              <li key={title}>
                <Button
                  asChild
                  size="sm"
                  className={badgeVariants({ variant: "secondary" })}
                >
                  <Link
                    href={`/search?url=${baseUrl}/jobs?q=${title}&l=${searchParams.l}&radius=50`}
                  >
                    <SearchIcon className="mr-2 h-3 w-3" />
                    {title}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default SearchPage;
