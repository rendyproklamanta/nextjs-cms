import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryMiddleware from "../baseQueryMiddleware";

export const patientApi = createApi({
   reducerPath: 'patientApi',
   baseQuery: baseQueryMiddleware(process.env.NEXT_PUBLIC_API_URL + 'patients'),
   tagTypes: [],
   endpoints: (builder) => ({
      createPatient: builder.mutation({
         query: (payload) => ({
            url: '/',
            method: 'POST',
            body: payload,
         }),
      }),
      updatePatient: builder.mutation({
         query: ({ id, payload }) => ({
            url: `/${id}`,
            method: 'PUT',
            body: payload,
         }),
      }),
      deletePatient: builder.mutation({
         query: (id) => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
      getPatient: builder.query(
         {
            query: (id) => `/${id}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getPatientAll: builder.query(
         {
            query: () => `/`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getPatientDropdown: builder.query({
         keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         query: () => `/`,
         transformResponse: (res) => {
            return res.data.map(({ _id, name, }) => ({
               value: _id,
               label: name,
            }));
         }
      }),
   }),
});

// Export hooks for usage in functional components
export const {
   useCreatePatientMutation,
   useGetPatientQuery,
   useGetPatientAllQuery,
   useGetPatientDropdownQuery,
   useUpdatePatientMutation,
   useDeletePatientMutation,
   util: { getRunningQueriesThunk },
} = patientApi;