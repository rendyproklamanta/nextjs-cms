'use client';

/* eslint-disable react/display-name */
import React, { useState } from "react";
import TableData from "@/src/components/TableData";
import Tooltip from "@/src/components/ui/Tooltip";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import moment from "moment";
import { useGetAntenatalAllQuery } from "@/src/store/api/antenatalApi";
import Loading from "@/src/app/loading";
import Card from "../../ui/Card";
import Flatpickr from "react-flatpickr";
import Button from "../../ui/Button";

const ReportMonthlyTable = () => {
   const { isLoading, data: res, refetch } = useGetAntenatalAllQuery();
   const [picker, setPicker] = useState(new Date());

   useEffect(() => {
      refetch();
   }, [refetch]);


   const COLUMNS = [
      {
         header: "nama pasien",
         accessor: "name",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value}</span>;
            }
         },
      },
      {
         id: "total kunjungan", // add unique id here
         header: "total kunjungan",
         accessor: "antenatal",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value.length}</span>;
            }
         },
      },
      {
         id: "kunjungan terakhir", // add unique id here
         header: "kunjungan terakhir",
         accessor: "antenatal",
         Cell: (row) => {
            if (row?.cell?.value) {
               var lastArray = row?.cell?.value.slice(-1)[0];
               return <span>{moment(lastArray.createdAt).format('dddd, DD-MM-YYYY HH:mm') + ' WIB'}</span>;
            }
         },
      },
      {
         header: "action",
         accessor: "_id",
         // eslint-disable-next-line no-unused-vars
         Cell: (row) => {
            return (
               <div className="flex justify-center space-x-3 rtl:space-x-reverse">
                  <Tooltip content="View" placement="top" arrow animation="shift-away">
                     <Link href={'/antenatal/view/' + row?.cell?.value}>
                        <button className="action-btn" type="button">
                           <Icon icon="heroicons:eye" />
                        </button>
                     </Link>
                  </Tooltip>
               </div>
            );
         },
      },
   ];

   if (isLoading) {
      return <Loading />;
   }

   if (!isLoading && res?.data) {
      return (
         <>
            <Card>
               <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                  <div>
                     <label htmlFor="default-picker" className="form-label">
                        Tanggal Awal
                     </label>
                     <Flatpickr
                        className="form-control py-2"
                        value={picker}
                        onChange={(date) => setPicker(date)}
                        id="default-picker"
                     />
                  </div>
                  <div>
                     <label htmlFor="default-picker" className="form-label">
                        Tanggal Akhir
                     </label>
                     <Flatpickr
                        className="form-control py-2"
                        value={picker}
                        onChange={(date) => setPicker(date)}
                        id="default-picker"
                     />
                  </div>
                  <div className="w-full">
                     <label className="form-label">&nbsp;</label>
                     <Button text="submit" className="btn-dark w-full h-10" />
                  </div>
               </div>
            </Card>
            <br />
            <TableData title={"Laporan bulanan"} columns={COLUMNS} data={res?.data} />;
         </>
      );
   }
};

export default ReportMonthlyTable;
