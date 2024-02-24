import { fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
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

  console.log(searchParams.url.searchParams);

  return (
    <>
      <section className="mx-auto flex max-w-7xl flex-col justify-between gap-6 bg-white px-6 pt-6 sm:flex-row md:pt-10 lg:pt-16 xl:pt-16">
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
                  className="flex justify-between space-x-4 space-y-2 rounded-lg border p-5"
                ></Link>
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
