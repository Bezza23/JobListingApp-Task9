import Image from "next/image";
import data from '@/data/data.json'
import {type Job} from "./types";
import JobCard from "./components/JobCard";
import Link from "next/link";


export default function Home() {
  const jobs: Job[] = data.job_postings;

  return (
    <div className="ml-18 mt-16">
      <h1 className="text-4xl font-extrabold">Opportunities</h1>
      <p className="text-s font-thin text-gray-600">Showing 5 results</p>
      {jobs.map(job => {
        return <Link key={job.id} href={`/jobs/${job.id}`}><JobCard job={job}/></Link>})}
    </div>
  );
}
