import React from 'react';
import HomePage from './page';
import { WEBSITE_DESC, WEBSITE_NAME } from '@/src/constant/setting';

export const metadata = {
   title: WEBSITE_NAME,
   description: WEBSITE_DESC,
};

const HomeLayout = () => {
   return <HomePage />;
};

export default HomeLayout;
