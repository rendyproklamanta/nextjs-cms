import 'react-toastify/dist/ReactToastify.css';
import 'simplebar-react/dist/simplebar.min.css';
import 'flatpickr/dist/themes/light.css';
import 'react-svg-map/lib/index.css';
import 'leaflet/dist/leaflet.css';
import './scss/app.scss';
import 'animate.css';

import AppLayout from './app';

export const metadata = {
   title: 'NextJS',
   description: 'Welcome to Next.js',
};

export default function RootLayout({ children }) {

   return (
      <>
         <AppLayout>{children}</AppLayout>
      </>
   );
}
