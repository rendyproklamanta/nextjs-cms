"use client";

import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "react-svg-map/lib/index.css";
import "leaflet/dist/leaflet.css";
import "./scss/app.scss";
import 'animate.css';

import { Provider } from "react-redux";
import store from "../store";
import { Roboto } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';

import moment from "moment";
import 'moment/locale/id';
moment().locale('id');

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function AppLayout({ children }) {
   return (
      <>
         <html lang="en">
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <body className={`font-inter custom-tippy dashcode-app ${roboto.className}`}>
               <NextTopLoader />
               <Provider store={store}>{children}</Provider>
            </body>
         </html>
      </>
   );
}
