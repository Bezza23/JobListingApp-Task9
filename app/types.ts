// app/types.ts

// These types belong here. They define your application's data structures.
export interface Job {
    id: string; 
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    idealCandidate: string;
    categories: string[];
    opType: string;
    startDate: string; 
    endDate: string;
    deadline: string;
    location: string[];
    requiredSkills: string[];
    whenAndWhere: string;
    datePosted: string;
    orgName: string;
    logoUrl: string;
}

export interface Api<T>{
    status: string,
    data: T
}

export interface JobCardProps {
    job : Job
}

export interface JobBookmark {
 id: string;
 userId: string;
 opportunityId: string;
}

