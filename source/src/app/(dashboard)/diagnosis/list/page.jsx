import React from 'react';
import DiagnosaTable from '@/src/components/table/DiagnosaTable';

export const metadata = {
   title: 'List Diagnosa',
   description: 'Welcome to Next.js',
};

const page = () => {
   return (
      <>
         <DiagnosaTable />
      </>
   );
};

export default page;