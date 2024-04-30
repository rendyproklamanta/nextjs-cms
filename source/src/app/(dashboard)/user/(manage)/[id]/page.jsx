import UserForm from '@/src/components/form/UserForm';
import React from 'react';

export const metadata = {
   title: 'Edit User',
   description: 'Welcome to Next.js',
};

const ManageUserPage = ({ params }) => {
   return <UserForm params={params} />;
};

export default ManageUserPage;
