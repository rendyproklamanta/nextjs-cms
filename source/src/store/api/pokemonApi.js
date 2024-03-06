import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
   reducerPath: 'pokemonApi',
   baseQuery: fetchBaseQuery({
      baseUrl: "https://pokeapi.co/api/v2/",
   }),
   tagTypes: [],
   endpoints: (builder) => ({
      getPokemonByName: builder.query(
         { query: (name) => `pokemon/${name}`, }
      ),
      getPokemonList: builder.query(
         {
            query: ({ offset, limit }) => `pokemon/?offset=${offset}&limit=${limit}`,
         },
      ),
   }),
});

// Export hooks for usage in functional components
export const {
   useGetPokemonByNameQuery,
   useGetPokemonListQuery,
   util: { getRunningQueriesThunk },
} = pokemonApi;

// export endpoints for use in SSR
export const { getPokemonByName, getPokemonList } = pokemonApi.endpoints;