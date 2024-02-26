function HeadsUp() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center md:text-start">
        <h2 className="mb-1 text-base font-medium leading-none tracking-tight md:text-lg">
          Heads up!
        </h2>
        <p className="mx-auto text-sm leading-relaxed md:mx-0 md:text-base">
          All search results are scraped from{" "}
          <a
            className="underline-offset-4 hover:underline"
            href="https://ca.indeed.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Indeed.ca
          </a>{" "}
          which may take up to 30-60 seconds.
        </p>
      </div>
    </section>
  );
}

export default HeadsUp;
