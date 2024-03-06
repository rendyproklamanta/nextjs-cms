import React from 'react';
import ReportDailyTable from '@/src/components/table/report/ReportDailyTable';

export const metadata = {
   title: 'Laporan Harian',
   description: 'Welcome to Next.js',
};


const page = () => {
   return (
      <>
         <ReportDailyTable />
      </>
   );
};

export default page;