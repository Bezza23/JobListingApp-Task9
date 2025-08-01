'use client'

import { type Job } from '@/app/types';
import JobCardDetail from '@/app/components/JobCardDetail';
import { useGetOpportunityByIdQuery } from '@/app/services/opportunitiesApi';
import { useParams } from 'next/navigation';

export default function JobDetailPage() {

  const param = useParams();
  const id = param.id as string;

  const {data:job , isLoading, error} = useGetOpportunityByIdQuery(id)

  if (isLoading){
    return <p className="mt-4 text-gray-600">Loading...</p>
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: Could not load job details.</div>;
  }

  if (!job) {
    return <div className="p-8">Job not found.</div>;
  }
  

  return (
    <div className="max-w-4xl mx-auto p-8 flex">
      <JobCardDetail job={job} />
    </div>
  );
}