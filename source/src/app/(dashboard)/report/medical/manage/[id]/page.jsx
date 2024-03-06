import MedicalRecordForm from '@/src/components/form/MedicalRecordForm';
import React from 'react';

export const metadata = {
   title: 'Edit Medical',
   description: 'Welcome to Next.js',
};


const MedicalRecordPage = ({ params }) => {
   return (
      <MedicalRecordForm params={params} />
   );
};

export default MedicalRecordPage;