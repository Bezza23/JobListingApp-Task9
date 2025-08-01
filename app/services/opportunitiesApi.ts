import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type Job,Api } from "../types";

const API_BASE_URL = 'https://akil-backend.onrender.com/'

export const opportunitiesApi = createApi({
    reducerPath: 'opportunitiesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL
    }),
    endpoints: (builder) => ({
        getOpportunities : builder.query<Job[],void>({
            query: () => 'opportunities/search',
            transformResponse : (response: Api<Job[]>) => response.data
        }),

        getOpportunityById : builder.query<Job,string>({
            query : (id) => `opportunities/${id}`,
            transformResponse: (response: Api<Job>) => response.data
        })
    })
})

export const { useGetOpportunitiesQuery, useGetOpportunityByIdQuery} = opportunitiesApi