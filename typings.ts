export type Job = {
  title: string;
  company: string;
  location: string;
  salary: string | null;
  description: string;
  date: string;
  link: string;
};

export type Result = {
  content: {
    title: string;
    jobs: Job[];
    total_jobs: string;
  };
};
