// app/bookmarks/page.tsx
'use client';

import { useGetOpportunitiesQuery, useGetBookmarksQuery } from '../services/opportunitiesApi';
import JobCard from '../components/JobCard';
import Link from 'next/link';

export default function BookmarksPage() {
  // 1. Fetch ALL jobs. We'll use this as our source of truth for job details.
  const { data: allJobs, isLoading: isLoadingJobs, isError: isErrorJobs } = useGetOpportunitiesQuery();
  
  // 2. Fetch the user's bookmarks. This gives us the IDs of the jobs to show.
  const { data: bookmarks, isLoading: isLoadingBookmarks, isError: isErrorBookmarks } = useGetBookmarksQuery();

  // The page is loading if either of the two queries is still loading.
  const isLoading = isLoadingJobs || isLoadingBookmarks;
  
  // The page is in an error state if either query failed.
  const isError = isErrorJobs || isErrorBookmarks;

  if (isLoading) {
    return (
      <div className="ml-18 mt-16">
        <h1 className="text-4xl font-extrabold">My Bookmarks</h1>
        <p className="mt-4 text-gray-600 text-2xl">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="ml-18 mt-16">
        <h1 className="text-4xl font-extrabold">My Bookmarks</h1>
        <p className="mt-4 text-red-500 text-4xl">Failed to load bookmarks.</p>
      </div>
    );
  }

  // 3. This is the core logic: Filter allJobs to get only the ones that are bookmarked.
  
  // First, create a Set of bookmarked opportunity IDs for fast lookups.
  const bookmarkedIds = new Set(bookmarks?.map(b => b.opportunityId));

  // Then, filter the main 'allJobs' list. A job is kept if its ID is in our Set.
  const bookmarkedJobs = allJobs?.filter(job => bookmarkedIds.has(job.id));

  return (
    <div className="ml-18 mt-16">
      <h1 className="text-4xl font-extrabold">My Bookmarks</h1>
      
      {bookmarkedJobs && bookmarkedJobs.length > 0 ? (
        // 4. Now we can map over the filtered list of full job objects.
        <div>
          <p className="text-s font-thin text-gray-600">Showing {bookmarkedJobs.length} saved jobs</p>
          {bookmarkedJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <JobCard job={job} />
            </Link>
          ))}
        </div>
      ) : (
        // This part remains the same, for when there are no bookmarks.
        <p data-testid="no-bookmarks-message" className="mt-4 text-gray-600 text-2xl">
          You haven`t saved any jobs yet.
        </p>
      )}
    </div>
  );
}