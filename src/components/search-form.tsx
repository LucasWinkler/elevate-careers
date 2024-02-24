"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPinIcon, SearchIcon } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  keywords: z.string().min(2).max(64),
  location: z.string().min(2).max(64),
});

function SearchForm() {
  const router = useRouter();

  const keywordsInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: "",
      location: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { keywords, location } = values;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_SCRAPING_URL;
    const url = new URL(baseUrl + "/jobs");

    url.searchParams.set("q", keywords.trim());
    url.searchParams.set("l", location.trim());

    router.push(`/search?url=${url.href}`);
  }

  return (
    <Form {...form}>
      <form className="" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col rounded-lg border bg-white sm:flex-row sm:items-center">
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem
                className='relative flex w-full items-center justify-center space-y-0 rounded-t-lg border-2 border-transparent duration-300 after:absolute after:bottom-[-3px] after:left-0 after:h-[1px] after:w-full after:bg-border after:content-[""] focus-within:border-primary sm:rounded-lg sm:after:bottom-[unset] sm:after:left-[unset] sm:after:right-[-3px] sm:after:h-7 sm:after:w-[1px]'
                onClick={() => keywordsInputRef.current?.focus()}
              >
                <SearchIcon className="mx-3 h-6 w-6 text-gray-500" />
                <FormControl>
                  <Input
                    className="peer block w-full appearance-none border-none bg-transparent pb-6 pl-0 pt-8 text-lg text-gray-800 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder=""
                    {...field}
                    ref={keywordsInputRef}
                  />
                </FormControl>
                <FormLabel className="absolute left-0 right-0 start-1 top-[1rem] z-10 ml-8 origin-[0] -translate-y-[0.785rem] scale-[0.82] transform cursor-text select-none truncate px-3 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[1.938rem] peer-focus:-translate-y-7 peer-focus:scale-[0.82] peer-focus:px-3 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  Job, keywords, or company
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem
                className="relative flex w-full items-center justify-center space-y-0 border-2 border-transparent duration-300 focus-within:border-primary sm:rounded-lg"
                onClick={() => locationInputRef.current?.focus()}
              >
                <MapPinIcon className="mx-3 h-6 w-6 text-gray-500" />
                <FormControl>
                  <Input
                    className="peer block w-full appearance-none border-none bg-transparent pb-6 pl-0 pt-8 text-lg text-gray-800 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder=""
                    {...field}
                    ref={locationInputRef}
                  />
                </FormControl>
                <FormLabel className="absolute left-0 right-0 start-1 top-[1rem] z-10 ml-8 origin-[0] -translate-y-[0.785rem] scale-[0.82] transform cursor-text select-none truncate px-3 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[1.938rem] peer-focus:-translate-y-7 peer-focus:scale-[0.82] peer-focus:px-3 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  Location
                </FormLabel>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="rounded-t-none sm:mx-3 sm:rounded-md"
            size="lg"
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
