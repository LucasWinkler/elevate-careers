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
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export type SearchParams = {
  url: URL;
  l: string;
};

type SearchPageProps = {
  searchParams: SearchParams;
};

async function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.url) {
    return notFound();
  }

  const results = await fetchResults(searchParams);

  if (!results) {
    return <div>No results...</div>;
  }

  const { title, jobs, total_jobs } = results.content;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_SCRAPING_URL;

  console.log(title);
  console.log(total_jobs);
  console.log(jobs[0]);

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
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="w-full md:w-1/3">
          <h2 className="mb-3 text-lg font-bold tracking-tight text-neutral-800">
            People also searched
          </h2>
          <ul className="flex flex-wrap gap-2">
            <li>
              <Button
                size="sm"
                className={badgeVariants({ variant: "secondary" })}
              >
                <SearchIcon className="mr-2 h-3 w-3" />
                software engineer
              </Button>
            </li>
            <li>
              <Button
                size="sm"
                className={badgeVariants({ variant: "secondary" })}
              >
                <SearchIcon className="mr-2 h-3 w-3" />
                developer
              </Button>
            </li>
            <li>
              <Button
                size="sm"
                className={badgeVariants({ variant: "secondary" })}
              >
                <SearchIcon className="mr-2 h-3 w-3" />
                junior developer
              </Button>
            </li>
            <li>
              <Button
                size="sm"
                className={badgeVariants({ variant: "secondary" })}
              >
                <SearchIcon className="mr-2 h-3 w-3" />
                data analyst
              </Button>
            </li>
            <li>
              <Button
                size="sm"
                className={badgeVariants({ variant: "secondary" })}
              >
                <SearchIcon className="mr-2 h-3 w-3" />
                web developer
              </Button>
            </li>
            <li>
              <Button
                size="sm"
                className={badgeVariants({ variant: "secondary" })}
              >
                <SearchIcon className="mr-2 h-3 w-3" />
                full stack developer
              </Button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default SearchPage;
