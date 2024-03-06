import React from 'react';
import MedicalRecordPage from './manage/[id]/page';
import MedicalRecordTable from '@/src/components/table/report/MedicalRecordTable';

export const metadata = {
   title: 'Medical Record',
   description: 'Welcome to Next.js',
};


const page = () => {
   return (
      <>
         <MedicalRecordPage />
         <br />
         <MedicalRecordTable />
      </>
   );
};

export default page;