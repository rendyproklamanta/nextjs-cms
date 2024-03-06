import React from 'react';
import MedicalRecordDetailTable from '@/src/components/table/report/MedicalRecordDetailTable';

export const metadata = {
   title: 'Medical Record',
   description: 'Welcome to Next.js',
};


const page = ({ params }) => {
   return (
      <>
         <MedicalRecordDetailTable params={params} />
      </>
   );
};

export default page;