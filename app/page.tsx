// app/page.tsx
'use client';

import { type Job } from "./types";
import JobCard from "./components/JobCard";
import Link from "next/link";
import { useGetOpportunitiesQuery } from "./services/opportunitiesApi";

// --- SIMPLE HEADER COMPONENT (can be moved to its own file later) ---
const AppHeader = () => (
  <header className="bg-white shadow-md p-4 mb-8">
    <nav className="flex justify-end gap-6 items-center">
      <Link href="/" className="text-gray-700 hover:text-indigo-600 font-semibold">
        All Jobs
      </Link>
      {/* This is the link Cypress will look for */}
      <Link 
        href="/bookmarks" 
        data-testid="bookmarks-nav-link" 
        className="text-gray-700 hover:text-indigo-600 font-semibold"
      >
        My Bookmarks
      </Link>
    </nav>
  </header>
);

export default function Home() {
  const { data: jobs, isLoading, error } = useGetOpportunitiesQuery();

  if (isLoading) {
    return (
      <div className="ml-18 mt-16">
        <AppHeader />
        <h1 className="text-4xl font-extrabold">Opportunities</h1>
        <p className="mt-4 text-gray-600 text-2xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-18 mt-16">
        <AppHeader />
        <h1 className="text-4xl font-extrabold">Opportunities</h1>
        <p className="mt-4 text-red-500 text-4xl">Failed to load opportunities. Please try again later.</p>
      </div>
    );
  }

  return (
    <> 
      <AppHeader />
      <div className="ml-18 mt-16">
        <h1 className="text-4xl font-extrabold">Opportunities</h1>
        <p data-testid="results-count" className="text-s font-thin text-gray-600">Showing {jobs?.length ?? 0} results</p>

        {/* ✅ Add test ID here to wrap all JobCards */}
        <div data-testid="job-list">
          {jobs?.map(job => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <JobCard job={job} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
