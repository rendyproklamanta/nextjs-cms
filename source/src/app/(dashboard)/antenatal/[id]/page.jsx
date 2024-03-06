import AntenatalForm from '@/src/components/form/AntenatalForm';
import React from 'react';

export const metadata = {
   title: 'Edit Antenatal',
   description: 'Welcome to Next.js',
};


const ManageAntenatalPage = ({ params }) => {
   return (
      <AntenatalForm params={params} />
   );
};

export default ManageAntenatalPage;