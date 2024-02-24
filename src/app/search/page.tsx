export const maxDuration = 300;

import { fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

export type SearchParams = {
  url: URL;
  l: string;
  start: string;
};

type SearchPageProps = {
  searchParams: SearchParams;
};

interface PaginationProps {
  searchParams: SearchParams;
  totalItems: string;
}

const JOBS_PER_PAGE = 15;

const generatePaginationLinks = ({
  searchParams,
  totalItems,
}: PaginationProps) => {
  const totalPages = Math.ceil(Number(totalItems) / JOBS_PER_PAGE);

  const links = [];
  for (let i = 1; i <= totalPages; i++) {
    const start = (i - 1) * JOBS_PER_PAGE;
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

function formatDescriptions(descriptions: string[]): string[] {
  if (!descriptions) {
    return [];
  }

  const formattedDescriptions: string[] = descriptions
    .join(" ")
    .split(/[.\n]+/)
    .filter((description) => description.trim() !== "");

  return formattedDescriptions.map((description) => description.trim());
}

async function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.url) {
    return notFound();
  }

  const results = await fetchResults(searchParams);

  if (!results) {
    return <div>No results...</div>;
  }

  console.log("results", results);

  const { jobs, total_jobs, related_jobs } = results.content;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_SCRAPING_URL;
  const startParam = searchParams.start ? Number(searchParams.start) : 0;

  const getPreviousPageUrl = () => {
    const start = Math.max(0, startParam - JOBS_PER_PAGE);
    return `/search?url=${searchParams.url}&l=${searchParams.l}${start !== 0 ? `&start=${start}` : ""}`;
  };

  const getNextPageUrl = () => {
    const start = startParam + JOBS_PER_PAGE;
    return `/search?url=${searchParams.url}&l=${searchParams.l}&start=${start}`;
  };

  return (
    <>
      <section className="mx-auto flex max-w-7xl flex-col justify-between gap-6 bg-white px-6 py-6 md:flex-row md:py-10 lg:py-16 xl:py-16">
        <div className="space-y-6 md:w-2/3">
          <div className="flex w-full justify-between self-start">
            <h2 className="text-lg font-bold tracking-tight text-neutral-800">
              {total_jobs} found
            </h2>
            <div>
              <Select defaultValue="relevant">
                <SelectTrigger className="mr-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Relevant</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {jobs.map((item, i) => (
              <li key={item.link}>
                <Link
                  href={baseUrl + item.link}
                  className="group flex flex-col justify-between rounded-lg border bg-white p-5 text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary focus:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="mb-1 flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold group-hover:text-primary">
                      {item.title}
                    </h3>
                    <div>
                      <ExternalLinkIcon className="h-6 w-6 rounded-sm text-secondary-foreground/50 transition-colors duration-300 group-hover:text-primary" />
                    </div>
                  </div>
                  <ul className="mb-1 flex flex-row gap-2 text-nowrap text-sm text-secondary-foreground/90">
                    <li className="font-medium text-secondary-foreground">
                      {item.company}
                    </li>
                    {item.salary != null && (
                      <>
                        <li>&#8226;</li>
                        <li>
                          <Badge>{item.salary || "$ Not known"}</Badge>
                        </li>
                      </>
                    )}
                  </ul>
                  <ul className="mb-2 ml-5 max-w-[50ch] list-disc leading-normal text-secondary-foreground/80">
                    {formatDescriptions(item.description).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between text-sm text-secondary-foreground/70">
                    <span className="">{item.location}</span>
                    <span className="">{item.date}</span>
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
        <div className="w-full md:w-1/3">
          <h2 className="mb-3 text-lg font-bold tracking-tight text-neutral-800">
            People also searched
          </h2>
          <ul className="flex flex-wrap gap-2">
            {related_jobs.map((title, i) => (
              <li key={title}>
                <Button
                  size="sm"
                  className={badgeVariants({ variant: "secondary" })}
                >
                  <SearchIcon className="mr-2 h-3 w-3" />
                  {title}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default SearchPage;
