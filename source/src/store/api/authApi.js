import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Swal from "sweetalert2";

const baseQuery = fetchBaseQuery({
   credentials: "include",
   baseUrl: process.env.NEXT_PUBLIC_API_URL + 'auths',
});

// const baseQueryMiddleware = async (args, api, extraOptions) => {
//    let result = await baseQuery(args, api, extraOptions);
//    if (result.error && result.error.status === "FETCH_ERROR") {
//       return Swal.fire(
//          'Failed!',
//          'Network error',
//          'error'
//       );
//    }

//    return result;
// };

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: baseQuery,
   tagTypes: [],
   endpoints: (builder) => ({
      postUserLogin: builder.mutation({
         query: (payload) => ({
            url: '/login',
            method: 'POST',
            body: payload,
         }),
      }),
      getUserInfo: builder.query(
         {
            query: ({ token }) => `/tokendata?token=${token}`,
         },
      ),
   }),
});

// Export hooks for usage in functional components
export const {
   usePostUserLoginMutation,
   useGetUserInfoQuery,
   util: { getRunningQueriesThunk },
} = authApi;

// export endpoints for use in SSR
export const { getUser } = authApi.endpoints;