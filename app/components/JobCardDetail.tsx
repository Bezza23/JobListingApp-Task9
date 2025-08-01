// JobCardDetail.tsx

import React from "react";
import { JobCardProps } from "../types";
import Link from "next/link";

// Import your icon components (make sure the paths are correct)
import { CheckIcon } from "./icons/CheckIcon";
import { LocationIcon } from "./icons/LocationIcon";
import { PostedOnIcon } from "./icons/PostedOnIcon";
import { DeadlineIcon } from "./icons/DeadlineIcon";
import { StartDateIcon } from "./icons/StartDateIcon";
import { EndDateIcon } from "./icons/EndDateIcon";


const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-start gap-4">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);


// --- Main Detail Component ---

const JobCardDetail = ({ job }: JobCardProps) => {
  const responsibilityItems = job.responsibilities.split('\n');
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/" className="text-blue-600 hover:underline mb-12 inline-block font-semibold">
        ← Back to Opportunities
      </Link>
      
      {/* The main two-column grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-24">
        
        {/* Main Content Column. No borders, no shadows. */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Description Section */}
          <div>
            <h2 className="text-2xl font-extrabold mb-4 text-gray-900">Description</h2>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </div>
          
          {/* Responsibilities Section */}
          <div>
            <h2 className="text-2xl font-extrabold mb-5 text-gray-900">Responsibilities</h2>
            <ul className="space-y-4">
              {responsibilityItems.map((res, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600">
                  <CheckIcon />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Ideal Candidate Section */}
          <div>
            <h2 className="text-2xl font-extrabold mb-5 text-gray-900">Ideal Candidate we want</h2>
            <p>{job.idealCandidate}</p>
          </div>

          {/* When & Where Section */}
          <div>
            <h2 className="text-2xl font-extrabold mb-5 text-gray-900">When & Where</h2>
            <div className="flex items-center gap-3 text-gray-600">
                <LocationIcon />
                <p>The onboarding for this event will take place in {formatDate(job.startDate)}  {job.whenAndWhere}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Column. No borders, no shadows. */}
        <aside className="lg:col-span-1 space-y-12">
          
          {/* About Section */}
          <div className="space-y-7">
            <h2 className="text-2xl font-extrabold text-gray-900">About</h2>
            <InfoItem icon={<PostedOnIcon />} label="Posted On" value={formatDate(job.datePosted)} />
            <InfoItem icon={<DeadlineIcon />} label="Deadline" value={formatDate(job.deadline)} />
            <InfoItem icon={<LocationIcon />} label="Location" value={job.location.join(', ')} />
            <InfoItem icon={<StartDateIcon />} label="Start Date" value={formatDate(job.startDate)} />
            <InfoItem icon={<EndDateIcon />} label="End Date" value={formatDate(job.endDate)} />
          </div>

          {/* Categories Section */}
          <div>
            <h2 className="text-2xl font-extrabold mb-4 text-gray-900">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {job.categories.map((category,index) => (
                <span key={category} className={index == 0?  'border-yellow-600 bg-yellow-100 text-yellow-600 rounded-2xl p-1.5': 'border-green-200 border bg-blue-100 text-blue-700 rounded-2xl p-1.5'}>
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Required Skills Section */}
           <div>
            <h2 className="text-2xl font-extrabold mb-4 text-gray-900">Required Skills</h2>
            <div className="flex flex-wrap gap-3">
              {job.requiredSkills.map((skill) => (
                <span key={skill} className="text-sm font-medium px-4 py-1.5 rounded-md bg-purple-100 text-gray-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobCardDetail;