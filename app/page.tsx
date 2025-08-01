'use client';

import Image from "next/image";
import data from '@/data/data.json'
import {type Job} from "./types";
import JobCard from "./components/JobCard";
import Link from "next/link";
import { useGetOpportunitiesQuery } from "./services/opportunitiesApi";


export default function Home() {
  const {data:jobs, isLoading, error} = useGetOpportunitiesQuery();


  if (isLoading) {
    return (
      <div className="ml-18 mt-16">
        <h1 className="text-4xl font-extrabold">Opportunities</h1>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    )
  };


  if (error){
    return (
      <div className="ml-18 mt-16">
        <h1 className="text-4xl font-extrabold">Opportunities</h1>
        <p className="mt-4 text-red-500">Failed to load opportunities. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="ml-18 mt-16">
      <h1 className="text-4xl font-extrabold">Opportunities</h1>
      <p className="text-s font-thin text-gray-600">Showing {jobs?.length ?? 0}results</p>
      {jobs?.map(job => {
        return <Link key={job.id} href={`/jobs/${job.id}`}><JobCard job={job}/></Link>})}
    </div>
  );
}
