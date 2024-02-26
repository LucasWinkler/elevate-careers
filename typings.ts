export type Job = {
  title: string;
  company: string;
  rating: string;
  location: string;
  metadata: string[];
  description: string[];
  date: string;
  link: string;
};

export type JobResults = {
  content: {
    title: string;
    jobs: Job[];
    total_jobs: string;
    related_jobs: string[];
  };
};
