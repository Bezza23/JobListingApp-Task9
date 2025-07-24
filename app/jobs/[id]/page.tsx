import data from '@/data/data.json';
import { type Job } from '@/app/types';
import JobCardDetail from '@/app/components/JobCardDetail';
import Link from 'next/link';
import { notFound } from 'next/navigation';


const getJobById = (id: number): Job | undefined => {
  return data.job_postings.find(job => job.id === id);
}


export default function JobDetailPage({ params }: { params: { id: string } }) {
  const jobId = parseInt(params.id, 10);
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-8 flex">

      <JobCardDetail job={job} />
      
    </div>
  );
}