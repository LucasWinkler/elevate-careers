function footer() {
  return (
    <footer className="mt-auto flex items-center justify-center bg-neutral-100 py-8">
      <p className="mx-auto max-w-7xl text-balance px-6 text-center text-sm text-secondary-foreground sm:text-base">
        Designed and built by{" "}
        <a
          className="underline underline-offset-4 transition-colors duration-300 hover:text-secondary-foreground/90"
          href="https://www.lucaswinkler.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lucas Winkler
        </a>{" "}
        using Next.js (React), TypeScript, Tailwind CSS and Oxylabs Web Scraper
        API.
      </p>
    </footer>
  );
}

export default footer;
