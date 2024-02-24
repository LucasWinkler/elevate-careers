"use client";

import SearchForm from "./search-form";

function Header() {
  return (
    <header className="bg-neutral-100 pb-8 pt-8 sm:pt-10 md:pb-10 md:pt-16 lg:pb-16 lg:pt-24 xl:pb-16 xl:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-2 max-w-[20ch] text-4xl font-bold leading-10 tracking-tight text-neutral-900 sm:text-5xl sm:leading-none lg:mb-4">
          Discover Opportunities to Soar in Your Career.
        </h1>
        <p className="mb-6 max-w-[55ch] text-neutral-600">
          Explore curated job listings sourced from Indeed. Elevate your career
          effortlessly with intuitive search features.
        </p>
        <SearchForm />
      </div>
    </header>
  );
}

export default Header;
