'use client';

import { Provider } from 'react-redux';
import store from '../store';
import { Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import moment from 'moment';
import 'moment/locale/id';
moment().locale('id');

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function AppLayout({ children }) {

   return (
      <>
         <html lang="en">
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <body className={`custom-tippy dashcode-app font-inter ${roboto.className}`}>
               <NextTopLoader />
               <Provider store={store}>{children}</Provider>
            </body>
         </html>
      </>
   );
}
