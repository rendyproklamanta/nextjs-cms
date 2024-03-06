'use client';

import DailyVisitChart from "@/src/components/chart/DailyVisitChart";
import HorizontalBar from "@/src/components/chart/HorizontalBar";
import Button from "@/src/components/ui/Button";
//import PreeklamsiaChart from "@/src/components/chart/PreeklamsiaChart";
import Card from "@/src/components/ui/Card";
import useUserInfo from "@/src/hooks/useUserInfo";
import moment from "moment";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";

const DashboardPage = () => {
   const [userInfo] = useUserInfo();

   const firstDate = new Date(new Date().getFullYear(), 0, 1);
   const lastDate = new Date(new Date().getFullYear(), 12, 0);

   const [pickerDate1, setPickerDate1] = useState(moment(firstDate).format("YYYY-MM-DD"));
   const [pickerDate2, setPickerDate2] = useState(moment(lastDate).format("YYYY-MM-DD"));

   const resetDate = () => {
      setPickerDate1(firstDate);
      setPickerDate2(lastDate);
   };

   const options = {
      dateFormat: 'Y-m-d',
   };

   const handlePrintClick = (id) => {
      const printableDiv = document.getElementById(id);
      if (printableDiv) {
         const printWindow = window.open('', '', '');
         printWindow.document.write('<html><head><style>@page { size: landscape; }</style></head><body>');
         printWindow.document.write(printableDiv.innerHTML);
         printWindow.document.write('</body></html>');
         printWindow.document.close();
         printWindow.print();
      }
   };

   return (
      <>
         <div className="space-y-5">

            <div className="grid grid-cols-1">
               <div className="2xl:col-span-3 lg:col-span-4 col-span-12 ">
                  <div className="bg-no-repeat bg-cover bg-center py-20 px-10 rounded-[6px] relative" style={{ backgroundImage: 'url("/assets/images/all-img/widget-bg-2.png")' }}>
                     <p className="font-bold md:text-5xl text-3xl block text-white mb-3">Selamat Datang..</p>
                     <p className="md:text-3xl text-xl block text-white capitalize">{userInfo.name}</p>
                  </div>
               </div>
            </div>

            <Card>
               <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                     <div>
                        <label htmlFor="picker1" className="form-label">
                           Pilih Tanggal Awal
                        </label>
                        <Flatpickr
                           className="form-control py-2"
                           value={pickerDate1}
                           onChange={(date) => setPickerDate1(date)}
                           id="picker1"
                           options={options}
                        />
                     </div>
                     <div>
                        <label htmlFor="picker2" className="form-label">
                           Pilih Tanggal Akhir
                        </label>
                        <Flatpickr
                           className="form-control py-2"
                           value={pickerDate2}
                           onChange={(date) => setPickerDate2(date)}
                           id="picker2"
                           options={options}
                        />
                     </div>
                  </div>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                     <div className="w-full">
                        <label className="form-label hidden md:block">&nbsp;</label>
                        <Button text="reset tanggal" icon="heroicons-x-mark" className="btn-danger w-full h-10" onClick={resetDate} />
                     </div>
                     <div className="w-full">
                        <label className="form-label hidden md:block">&nbsp;</label>
                        <Button onClick={() => handlePrintClick('printDailyVisit')} text="grafik Kunjungan" icon="heroicons-printer" className="btn-success w-full h-10" />
                     </div>
                     <div className="w-full">
                        <label className="form-label hidden md:block">&nbsp;</label>
                        <Button onClick={() => handlePrintClick('printPreeklampsia')} text="grafik preeklampsia" icon="heroicons-printer" className="btn-success w-full h-10" />
                     </div>
                  </div>
               </div>
            </Card>

            <div id="printDailyVisit">
               <Card title="Grafik Kunjungan pasien2">
                  <DailyVisitChart firstDate={pickerDate1} lastDate={pickerDate2} />
               </Card>
            </div>

            {/* <Card title="Grafik Preeklamsia">
               <PreeklamsiaChart />
            </Card> */}

            <div id="printPreeklampsia">
               <Card title="Grafik Preeklampsia">
                  <HorizontalBar firstDate={pickerDate1} lastDate={pickerDate2} />
               </Card>
            </div>
         </div>

      </>

   );

};

export default DashboardPage;
