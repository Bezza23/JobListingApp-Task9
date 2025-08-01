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


// types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
 
  interface User {
    accessToken?: string | null;
    role?: string | null;
    name?: string | null;
    email?: string | null;
  }

  
  interface Session {
    user: {
      accessToken?: string | null;
      role?: string | null;
    } & DefaultSession["user"]; // Keep the default properties
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string | null;
    role?: string | null;
  }
}