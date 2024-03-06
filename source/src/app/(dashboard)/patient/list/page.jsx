import React from 'react';
import PatientTable from '@/src/components/table/PatientTable';

export const metadata = {
   title: 'Patient List',
   description: 'Welcome to Next.js',
};


const page = () => {
   return (
      <>
         <PatientTable />
      </>
   );
};

export default page;