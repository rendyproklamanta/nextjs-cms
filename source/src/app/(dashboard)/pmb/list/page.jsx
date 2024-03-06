import React from 'react';
import PmbTable from '@/src/components/table/PmbTable';

export const metadata = {
   title: 'PMB List',
   description: 'Welcome to Next.js',
};


const page = () => {
   return (
      <>
         <PmbTable />
      </>
   );
};

export default page;