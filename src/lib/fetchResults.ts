import { SearchParams } from "@/app/search/page";
import { JobResults } from "../../typings";

export async function fetchJobs(searchParams: SearchParams) {
  const username = process.env.OXYLABS_USERNAME;
  const password = process.env.OXYLABS_PASSWORD;

  const url = new URL(searchParams.url);
  Object.keys(searchParams).forEach((key) => {
    if (key === "url") {
      return;
    }

    const value = searchParams[key as keyof SearchParams];

    if (typeof value === "string") {
      url.searchParams.append(key, value);
    }
  });

  const body = {
    source: "universal",
    url: url.href,
    parse: true,
    render: "html",
    parsing_instructions: {
      title: {
        _fns: [
          {
            _fn: "xpath_one",
            _args: ["//title/text()"],
          },
        ],
      },
      jobs: {
        _fns: [
          {
            _fn: "xpath",
            _args: [".//div[@data-testid='slider_item']"],
          },
        ],
        _items: {
          title: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//h2[contains(@class, 'jobTitle')]/a/span/text()"],
              },
            ],
          },
          company: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//span[@data-testid='company-name']/text()"],
              },
            ],
          },
          location: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//div[@data-testid='text-location']//text()"],
              },
            ],
          },
          salary: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  ".//div[contains(@class, 'salary-snippet-container') or contains(@class, 'estimated-salary')]//text()",
                ],
              },
            ],
          },
          description: {
            _fns: [
              {
                _fn: "xpath",
                _args: [
                  ".//table[@class='css-1u8dvic eu4oa1w0']//div[@class='css-9446fg eu4oa1w0']//ul/li//text()",
                ],
              },
            ],
          },
          date: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//span[@data-testid='myJobsStateDate']/text()"],
              },
            ],
          },
          link: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//h2[contains(@class, 'jobTitle')]/a/@href"],
              },
            ],
          },
        },
      },
      total_jobs: {
        _fns: [
          {
            _fn: "xpath_one",
            _args: [
              ".//div[contains(@class, 'jobsearch-JobCountAndSortPane-jobCount')]/span/text()",
            ],
          },
        ],
      },
      related_jobs: {
        _fns: [
          {
            _fn: "xpath",
            _args: [
              ".//a[@data-testid='relatedQuery']/span[@class='css-1cnu4h8 eu4oa1w0']/text()",
            ],
          },
        ],
      },
    },
  };

  const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
    method: "POST",
    body: JSON.stringify(body),
    next: {
      revalidate: 60 * 60,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.results && data.results.length === 0) {
        return;
      }

      const result: JobResults = data.results[0];

      return result;
    })
    .catch((err) => {
      console.error(err);
    });

  return response;
}
