import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
   reducerPath: 'addressApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://ibnux.github.io/data-indonesia',
   }),
   tagTypes: [],
   endpoints: (builder) => ({
      getProvince: builder.query({
         query: () => `/provinsi.json`,
         transformResponse: (res) => {
            return res.map(({ id, nama, }) => ({
               value: `${id + ',' + nama}`,
               label: nama,
            }));
         }
      }),
      getRegency: builder.query({
         query: (id) => `/kabupaten/${id}.json`,
         transformResponse: (res) => {
            return res.map(({ id, nama, }) => ({
               value: `${id + ',' + nama}`,
               label: nama,
            }));
         }
      }),
      getSubdistrict: builder.query({
         query: (id) => `/kecamatan/${id}.json`,
         transformResponse: (res) => {
            return res.map(({ id, nama, }) => ({
               value: `${id + ',' + nama}`,
               label: nama,
            }));
         }
      }),
   }),
});

// Export hooks for usage in functional components
export const {
   useGetProvinceQuery,
   useGetRegencyQuery,
   useGetSubdistrictQuery,
   util: { getRunningQueriesThunk },
} = addressApi;