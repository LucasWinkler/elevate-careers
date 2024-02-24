export const maxDuration = 300;

import { fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";
import { badgeVariants } from "@/components/ui/badge";
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
      <section className="mx-auto flex max-w-7xl flex-col justify-between gap-6 bg-white px-6 py-6 sm:flex-row md:py-10 lg:py-16 xl:py-16">
        <div className="space-y-6 sm:w-2/3">
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
                  <div className="flex items-start justify-between">
                    <h3 className="text-base font-bold group-hover:text-primary">
                      {item.title}
                    </h3>
                    <div className="">
                      <ExternalLinkIcon className="h-6 w-6 rounded-sm text-secondary-foreground/50 transition-colors duration-300 group-hover:text-primary" />
                    </div>
                  </div>
                  <ul className="flex flex-row gap-2 text-nowrap text-sm text-secondary-foreground/90">
                    <li className="font-medium text-secondary-foreground">
                      {item.company}
                    </li>
                    <li>&#8226;</li>
                    <li>Full Time</li>
                    <li>&#8226;</li>
                    <li>50-100 employees</li>
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[200px] w-full sm:w-1/3">
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
