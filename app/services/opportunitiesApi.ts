// app/services/opportunitiesApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type Job, Api, type JobBookmark } from "../types";
import { getSession } from "next-auth/react";

const API_BASE_URL = 'https://akil-backend.onrender.com/';

export const opportunitiesApi = createApi({
    reducerPath: 'opportunitiesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        // Prepare headers to include the auth token for every request
        prepareHeaders: async (headers) => {
            const session = await getSession();
            // Thanks to our next-auth.d.ts file, TypeScript now knows this property exists.
            if (session?.user.accessToken) {
                headers.set('Authorization', `Bearer ${session.user.accessToken}`);
            }
            return headers;
        },
    }),
    // Add tags for caching. This will let us auto-refetch bookmarks.
    tagTypes: ['Bookmark'],
    endpoints: (builder) => ({
        getOpportunities: builder.query<Job[], void>({
            query: () => 'opportunities/search',
            transformResponse: (response: Api<Job[]>) => response.data,
        }),
        getOpportunityById: builder.query<Job, string>({
            query: (id) => `opportunities/${id}`,
            transformResponse: (response: Api<Job>) => response.data,
        }),
        
        getBookmarks: builder.query<JobBookmark[], void>({
            query: () => 'bookmarks',
            // The API response for bookmarks might be wrapped in a `data` property.
            // If it is, this transform is correct. If not, you can remove it.
            transformResponse: (response: Api<JobBookmark[]>) => response.data,
            // This query provides the 'Bookmark' tag.
            providesTags: ['Bookmark'],
        }),
        createBookmark: builder.mutation<void, string>({
            query: (jobId) => ({
                url: `bookmarks/${jobId}`,
                method: 'POST',
            }),
            // When this runs, it invalidates the 'Bookmark' tag, forcing getBookmarks to refetch.
            invalidatesTags: ['Bookmark'],
        }),
        unbookmark: builder.mutation<void, string>({
            query: (jobId) => ({
                url: `bookmarks/${jobId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bookmark'],
        }),
    }),
});

export const { 
    useGetOpportunitiesQuery, 
    useGetOpportunityByIdQuery,
    useGetBookmarksQuery,
    useCreateBookmarkMutation,
    useUnbookmarkMutation,
} = opportunitiesApi;