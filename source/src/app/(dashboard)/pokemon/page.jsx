'use client';

import { useGetPokemonListQuery } from "@/src/store/api/pokemonApi";
import React, { useState } from "react";
import { BsArrowClockwise } from 'react-icons/bs';

const PokemonPage = () => {
   const [page, setPage] = useState(1);
   const { isFetching, data, refetch } = useGetPokemonListQuery({ offset: page < 1 ? 1 : page, limit: 10 });

   return <>
      {isFetching ? 'Loading...' : data.results.map((res, i) => (
         <li key={i}>{res.name}</li>
      ))}
      <div className="flex space-xy-5 mt-5">
         <button type="button" className="btn btn inline-flex justify-center btn-secondary btn-sm" onClick={() => setPage((prev) => prev - 10)}>
            <span className="flex items-center">Prev</span>
         </button>
         <button type="button" className="btn btn inline-flex justify-center btn-primary btn-sm" onClick={() => setPage((next) => next + 10)}>
            <span className="flex items-center">Next</span>
         </button>
         <button type="button" className="btn btn inline-flex justify-center btn-primary btn-sm" onClick={() => refetch()}>
            <span className="flex items-center">
               <BsArrowClockwise size={15} color="white" className="ltr:mr-2 rtl:ml-2" />
               Refetch
            </span>
         </button>
      </div>
   </>;
};

export default PokemonPage;
