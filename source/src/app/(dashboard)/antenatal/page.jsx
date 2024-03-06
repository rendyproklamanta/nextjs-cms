import AntenatalTable from '@/src/components/table/AntenatalTable';
import React from 'react';
import ManageAntenatalPage from './[id]/page';

export const metadata = {
   title: 'Antenatal Care',
   description: 'Welcome to Next.js',
};


const page = () => {
   return (
      <>
         <ManageAntenatalPage />
         <br />
         <AntenatalTable />
      </>
   );
};

export default page;