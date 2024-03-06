import PreeklampsiaForm from '@/src/components/form/preeklampsiaForm';
import PreeklampsiaTable from '@/src/components/table/PreeklampsiaTable';
import React from 'react';

export const metadata = {
   title: 'Edit Preeklampsia',
   description: 'Welcome to Next.js',
};


const ManagePreeklampsiaPage = ({ params }) => {
   return (
      <>
         <PreeklampsiaForm params={params} />
         <br />
         <PreeklampsiaTable />
      </>
   );
};

export default ManagePreeklampsiaPage;