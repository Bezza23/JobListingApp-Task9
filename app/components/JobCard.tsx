"use client";

import React from 'react';
import { type JobCardProps } from '../types';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import toast from "react-hot-toast";
import { 
  useGetBookmarksQuery, 
  useCreateBookmarkMutation, 
  useUnbookmarkMutation 
} from "../services/opportunitiesApi";

// A simple, reusable bookmark icon component
const BookmarkIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const JobCard = ({ job }: JobCardProps) => {
  const { data: session } = useSession();

  const { data: bookmarks } = useGetBookmarksQuery(undefined, {
    skip: !session,
  });

  const [createBookmark, { isLoading: isBookmarking }] = useCreateBookmarkMutation();
  const [unbookmark, { isLoading: isUnbookmarking }] = useUnbookmarkMutation();

  const isLoading = isBookmarking || isUnbookmarking;

  const isBookmarked = bookmarks?.some(b => b.opportunityId === job.id) ?? false;

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!session) {
      toast.error("You must be logged in to bookmark jobs.");
      return;
    }

    try {
      if (isBookmarked) {
        await unbookmark(job.id).unwrap();
        toast.success("Bookmark removed!");
      } else {
        await createBookmark(job.id).unwrap();
        toast.success("Job bookmarked!");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    // 🔽 Wrap the whole thing in a job-list test ID container
    <div data-testid="job-list">
      <Link href={`/jobs/${job.id}`} passHref>
        <div
          data-testid={`job-card-${job.id}`}
          className="relative flex items-start gap-4 p-6 shadow rounded-3xl max-w-3xl max-h-6xl mt-8 border border-gray-300 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        >
          <div>
            <img
              src={job.logoUrl}
              alt={`${job.orgName} logo`}
              className="w-[50px] h-[50px] rounded-md"
            />
          </div>

          <div>
            <h2 className="font-bold text-xl capitalize mb-0.5">{job.title}</h2>
            <p className="text-m text-gray-500 mb-3">{job.orgName}. {job.location}</p>
            <p className="mb-3">
              {job.description.split('.').slice(0, 2).join('.') + '.'}
            </p>

            <div className="flex items-center gap-2">
              <p className="border-cyan-400 bg-cyan-50 text-cyan-700 rounded-2xl p-1.5 capitalize">
                {job.opType}
              </p>
              <p className="text-2xl font-extralight text-gray-300">|</p>
              {job.categories.map((category, index) => (
                <span
                  key={category}
                  className={
                    index === 0
                      ? 'border-yellow-600 border bg-yellow-200 text-yellow-600 rounded-2xl p-1.5'
                      : 'border-blue-700 border bg-blue-300 text-blue-700 rounded-2xl p-1.5'
                  }
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {session && (
            <button
              data-testid={`bookmark-btn-${job.id}`}
              onClick={handleBookmarkToggle}
              disabled={isLoading}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600 disabled:opacity-50 z-10"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <BookmarkIcon filled={isBookmarked} />
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
