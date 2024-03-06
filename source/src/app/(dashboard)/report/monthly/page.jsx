import React from 'react';
import ReportMonthlyTable from '@/src/components/table/report/ReportMonthlyTable';

export const metadata = {
   title: 'Laporan Bulanan',
   description: 'Welcome to Next.js',
};


const page = () => {
   return (
      <>
         <ReportMonthlyTable />
      </>
   );
};

export default page;