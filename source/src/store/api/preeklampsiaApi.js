import { preeklampsiaResult } from "@/src/configs/constants";
import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import baseQueryMiddleware from "../baseQueryMiddleware";

export const preeklampsiaApi = createApi({
   reducerPath: 'preeklampsiaApi',
   baseQuery: baseQueryMiddleware(process.env.NEXT_PUBLIC_API_URL + 'patients-preeklampsia'),
   tagTypes: [],
   endpoints: (builder) => ({
      createPreeklampsia: builder.mutation({
         query: ({ id, payload }) => ({
            url: `/${id}`,
            method: 'POST',
            body: payload,
         }),
      }),
      getPreeklampsia: builder.query(
         {
            query: (id) => `/${id}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      updatePreeklampsia: builder.mutation({
         query: ({ id, payload }) => ({
            url: `/${id}`,
            method: 'PUT',
            body: payload,
         }),
      }),
      deletePreeklampsia: builder.mutation({
         query: (id) => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
      getPreeklampsiaAll: builder.query(
         {
            query: () => `/`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getPreeklampsiaDropdown: builder.query({
         query: (id) => `/${id}`,
         keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         transformResponse: (res) => {
            const data = res?.data?.preeklampsia;

            if (data && data.length) {
               toast.success("Silahkan pilih Preeklampsia", {
                  position: "top-center",
                  autoClose: 1000,
               });
               return data.map((res) => ({
                  value: res._id,
                  label: `#${res.uid} - ${preeklampsiaResult(res.result)}`,
               }));
            } else {
               toast.error("Data preeklampsia tidak ditemukan", {
                  position: "top-center",
                  autoClose: 1000,
               });
               return false;
            }
         }
      }),
      getPreeklampsiaDetail: builder.query(
         {
            query: (id) => `/detail/${id}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getPreeklampsiaChart: builder.query(
         {
            query: () => `/chart/pie`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getPreeklampsiaChartBar: builder.query(
         {
            query: ({ firstDate, lastDate }) => `/chart/bar/${firstDate}/${lastDate}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
   }),
});

// Export hooks for usage in functional components
export const {
   useCreatePreeklampsiaMutation,
   useGetPreeklampsiaQuery,
   useGetPreeklampsiaAllQuery,
   useUpdatePreeklampsiaMutation,
   useDeletePreeklampsiaMutation,
   useGetPreeklampsiaDropdownQuery,
   useGetPreeklampsiaDetailQuery,
   useGetPreeklampsiaChartQuery,
   useGetPreeklampsiaChartBarQuery,
   util: { getRunningQueriesThunk },
} = preeklampsiaApi;