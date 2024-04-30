import React from 'react';
import UserTable from '@/src/components/table/UserTable';

export const metadata = {
   title: 'List User',
   description: 'Welcome to Next.js',
};

const page = () => {
   return (
      <>
         <UserTable />
      </>
   );
};

export default page;
