import { createApi } from "@reduxjs/toolkit/query/react";
import moment from "moment";
import { toast } from "react-toastify";
import baseQueryMiddleware from "../baseQueryMiddleware";

export const antenatalApi = createApi({
   reducerPath: 'antenatalApi',
   baseQuery: baseQueryMiddleware(process.env.NEXT_PUBLIC_API_URL + 'patients-antenatal'),
   tagTypes: [],
   endpoints: (builder) => ({
      createAntenatal: builder.mutation({
         query: ({ id, payload }) => ({
            url: `/${id}`,
            method: 'POST',
            body: payload,
         }),
      }),
      updateAntenatal: builder.mutation({
         query: ({ id, payload }) => ({
            url: `/${id}`,
            method: 'PUT',
            body: payload,
         }),
      }),
      deleteAntenatal: builder.mutation({
         query: (id) => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
      getAntenatal: builder.query(
         {
            query: (id) => `/${id}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getAntenatalAll: builder.query(
         {
            query: () => `/`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getAntenatalDropdown: builder.query({
         query: (id) => `/${id}`,
         keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         transformResponse: (res) => {
            const data = res?.data?.antenatal;

            if (data && data.length) {
               toast.success("Silahkan pilih antenatal", {
                  position: "top-center",
                  autoClose: 1000,
               });
               return data.map((res) => ({
                  value: res._id,
                  label: `#${res.uid} - ${moment(res?.createdAt).format('DD/MM/YYYY')}`,

               }));
            } else {
               toast.error("Data antenatal tidak ditemukan", {
                  position: "top-center",
                  autoClose: 1000,
               });
               return false;
            }

         }
      }),
      getAntenatalDetail: builder.query(
         {
            query: (id) => `/detail/${id}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getAntenatalDailyVisitChart: builder.query(
         {
            query: ({ firstDate, lastDate }) => `/chart/daily-visit/${firstDate}/${lastDate}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
   }),
});

// Export hooks for usage in functional components
export const {
   useCreateAntenatalMutation,
   useGetAntenatalQuery,
   useGetAntenatalAllQuery,
   useUpdateAntenatalMutation,
   useDeleteAntenatalMutation,
   useGetAntenatalDropdownQuery,
   useGetAntenatalDetailQuery,
   useGetAntenatalDailyVisitChartQuery,
   util: { getRunningQueriesThunk },
} = antenatalApi;