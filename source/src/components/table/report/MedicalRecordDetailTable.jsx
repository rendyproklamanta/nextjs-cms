'use client';

/* eslint-disable react/display-name */
import React from "react";
import TableData from "@/src/components/TableData";
import Tooltip from "@/src/components/ui/Tooltip";
import Link from "next/link";
import { Icon } from "@iconify/react";
import moment from "moment";
import Loading from "@/src/app/loading";
import { useGetMedicalQuery } from "@/src/store/api/medicalApi";

const MedicalRecordDetailTable = ({ params }) => {
   const { isLoading, data: res } = useGetMedicalQuery(params?.id);

   const COLUMNS = [
      {
         header: "uid",
         accessor: "uid",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>#{row?.cell?.value}</span>;
            }
         },
      },
      {
         header: "Tanggal rekam",
         accessor: "createdAt",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{moment(row?.cell?.value).format('dddd, DD-MM-YYYY HH:mm') + ' WIB'}</span>;
            }
         },
      },
      {
         header: "id antenatal",
         accessor: "idAntenatal",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value}</span>;
            }
         },
      },
      {
         header: "id Preeklampsia",
         accessor: "idPreeklampsia",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value}</span>;
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
                  <Tooltip content="Print Preview" placement="top" arrow animation="shift-away">
                     <Link href={'/report/medical/print/' + row?.cell?.value}>
                        <button className="action-btn" type="button">
                           <Icon icon="heroicons:printer" />
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
      return <TableData title={"List Record e-Rekam (" + res?.data.name + ")"} columns={COLUMNS} data={res?.data?.medical} isBack={!isLoading && res?.data.medical ? true : false}  />;
   }
};

export default MedicalRecordDetailTable;
