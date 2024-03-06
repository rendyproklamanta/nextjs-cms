"use client";

import MedicalRecord from "@/src/components/print/MedicalRecord";
import Card from "@/src/components/ui/Card";
import Icons from "@/src/components/ui/Icon";
import { useGetAntenatalDetailQuery } from "@/src/store/api/antenatalApi";
import { useGetMedicalDetailQuery } from "@/src/store/api/medicalApi";
import { useGetPmbQuery } from "@/src/store/api/pmbApi";
import { useGetPreeklampsiaDetailQuery } from "@/src/store/api/preeklampsiaApi";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useReactToPrint } from 'react-to-print';


const MedicalPrintPage = ({ params }) => {
   const router = useRouter();
   const { data: res } = useGetMedicalDetailQuery(params?.id);
   const { data: dataPmb } = useGetPmbQuery(res?.data[0].medical[0].idPmb, { skip: res?.data[0].medical[0].idPmb === undefined });
   const { data: dataAntenatal } = useGetAntenatalDetailQuery(res?.data[0].medical[0].idAntenatal, { skip: res?.data[0].medical[0].idAntenatal === undefined });
   const { data: dataPreeklampsia } = useGetPreeklampsiaDetailQuery(res?.data[0].medical[0].idPreeklampsia, { skip: res?.data[0].medical[0].idPreeklampsia === undefined });

   // eslint-disable-next-line no-unused-vars
   const PrintComponent = React.forwardRef(({ onClick, href }, ref) => {
      return (
         <Card>
            <div ref={ref}>
               <MedicalRecord
                  data={res?.data[0]}
                  pmb={dataPmb?.data}
                  antenatal={dataAntenatal?.data[0]?.antenatal[0]}
                  preeklampsia={dataPreeklampsia?.data[0]?.preeklampsia[0]}
               />
            </div>
         </Card>
      );
   });

   PrintComponent.displayName = "PrintComponent";

   const pageStyle = `
   @media print {
      body {
         zoom:78%;
      }
   }
   @page {
      size: A4 portrait;
      margin: 8mm;
    }
   `;
   const componentRef = useRef();
   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      pageStyle: pageStyle
   });

   return (
      <div>
         <div className="lg:flex justify-between flex-wrap items-center mb-6">
            <h4>Preview</h4>
            <div className="flex lg:justify-end items-center flex-wrap space-xy-5">
               <button onClick={() => router.back()} className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
                  <span className="text-lg">
                     <Icons icon="heroicons:chevron-left" />
                  </span>
                  <span>kembali</span>
               </button>
               <button
                  type="button"
                  onClick={handlePrint}
                  className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse"
               >
                  <span className="text-lg">
                     <Icons icon="heroicons:printer" />
                  </span>
                  <span>Print</span>
               </button>
            </div>
         </div>
         <PrintComponent ref={componentRef} />
      </div>
   );
};

export default MedicalPrintPage;
