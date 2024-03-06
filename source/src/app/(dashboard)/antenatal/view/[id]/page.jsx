import AntenatalDetailTable from '@/src/components/table/AntenatalDetailTable';
import React from 'react';

export const metadata = {
   title: 'Antenatal',
   description: 'Welcome to Next.js',
};


const page = ({ params }) => {
   return (
      <>
         <AntenatalDetailTable params={params} />
      </>
   );
};

export default page;