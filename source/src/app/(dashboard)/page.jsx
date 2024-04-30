'use client';

import Button from '@/src/components/ui/Button';
//import PreeklamsiaChart from "@/src/components/chart/PreeklamsiaChart";
import Card from '@/src/components/ui/Card';
import useUserInfo from '@/src/hooks/useUserInfo';
import moment from 'moment';
import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';

const DashboardPage = () => {
   const [userInfo] = useUserInfo();

   const firstDate = new Date(new Date().getFullYear(), 0, 1);
   const lastDate = new Date(new Date().getFullYear(), 12, 0);

   const [pickerDate1, setPickerDate1] = useState(
      moment(firstDate).format('YYYY-MM-DD'),
   );
   const [pickerDate2, setPickerDate2] = useState(
      moment(lastDate).format('YYYY-MM-DD'),
   );

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
         printWindow.document.write(
            '<html><head><style>@page { size: landscape; }</style></head><body>',
         );
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
               <div className="col-span-12 lg:col-span-4 2xl:col-span-3 ">
                  <div
                     className="relative rounded-[6px] bg-cover bg-center bg-no-repeat px-10 py-20"
                     style={{
                        backgroundImage:
                           'url("/assets/images/all-img/widget-bg-2.png")',
                     }}
                  >
                     <p className="mb-3 block text-3xl font-bold text-white md:text-5xl">
                        Selamat Datang..
                     </p>
                     <p className="block text-xl capitalize text-white md:text-3xl">
                        {userInfo.name}
                     </p>
                  </div>
               </div>
            </div>
            {/* <Card>
               <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                     <div className="w-full">
                        <label className="form-label hidden md:block">
                           &nbsp;
                        </label>
                        <Button
                           text="reset tanggal"
                           icon="heroicons-x-mark"
                           className="btn-danger h-10 w-full"
                           onClick={resetDate}
                        />
                     </div>
                     <div className="w-full">
                        <label className="form-label hidden md:block">
                           &nbsp;
                        </label>
                        <Button
                           onClick={() => handlePrintClick('printDailyVisit')}
                           text="grafik Kunjungan"
                           icon="heroicons-printer"
                           className="btn-success h-10 w-full"
                        />
                     </div>
                     <div className="w-full">
                        <label className="form-label hidden md:block">
                           &nbsp;
                        </label>
                        <Button
                           onClick={() => handlePrintClick('printPreeklampsia')}
                           text="grafik preeklampsia"
                           icon="heroicons-printer"
                           className="btn-success h-10 w-full"
                        />
                     </div>
                  </div>
               </div>
            </Card>

            <div id="printDailyVisit">
               <Card title="Grafik Kunjungan pasien2">
                  <DailyVisitChart
                     firstDate={pickerDate1}
                     lastDate={pickerDate2}
                  />
               </Card>
            </div>

            <Card title="Grafik Preeklamsia">
               <PreeklamsiaChart />
            </Card> 

            <div id="printPreeklampsia">
               <Card title="Grafik Preeklampsia">
                  <HorizontalBar
                     firstDate={pickerDate1}
                     lastDate={pickerDate2}
                  />
               </Card>
            </div>{' '}
            */}
         </div>
      </>
   );
};

export default DashboardPage;
