import React from 'react';
import { type JobCardProps } from '../types';

const JobCard = ({job} : JobCardProps ) => {

  return (
    <div className='flex items-start gap-4 p-6 shadow rounded-3xl max-w-3xl max-h-6xl mt-8 border border-gray-300'>
        <div> 
            <img src={job.image}/>
        </div>

        <div>
            <h2 className='font-bold text-xl capitalize mb-0.5'>{job.title}</h2>
            <p className='text-m text-gray-500 mb-3'>{job.company}.{job.about.location}</p>
            <p className='mb-3'>{job.description.split('.').slice(0,2).join('.')+'.'}</p>
            
            <div className='flex gap-2'>
                <p className='border-cyan-400 bg-cyan-50 text-cyan-700 rounded-2xl p-1.5'>In Person</p>
                <p className='text-2xl font-extralight text-gray-300'>|</p>
                {job.about.categories.map((catagory,index) => {
                  return (
                    <span key={catagory} className={`${index === 0? 'border-yellow-600 border bg-yellow-200 text-yellow-600 rounded-2xl p-1.5' : 'border-blue-700 border bg-blue-300 text-blue-700 rounded-2xl p-1.5'}`}>
                      {catagory}
                    </span>
                  )
                } )}
                
            </div>
        </div>

    </div>
  )
}

export default JobCard