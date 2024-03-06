'use client';

/* eslint-disable react/display-name */
import React from "react";
import TableData from "@/src/components/TableData";
import { useEffect } from "react";
import moment from "moment";
import { useGetAntenatalQuery } from "@/src/store/api/antenatalApi";
import Loading from "@/src/app/loading";

const AntenatalDetailTable = ({ params }) => {
   const { isLoading, data: res, refetch } = useGetAntenatalQuery(params?.id);

   useEffect(() => {
      refetch();
   }, [refetch]);


   const COLUMNS = [
      {
         header: "UID",
         accessor: "uid",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>#{row?.cell?.value}</span>;
            }
         },
      },
      {
         header: "Tanggal Dibuat",
         accessor: "createdAt",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{moment(row?.cell?.value).format('DD-MM-YYYY')}</span>;
            }
         },
      },
      {
         header: "Tinggi",
         accessor: "height",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value}</span>;
            }
         },
      },
      {
         header: "Berat",
         accessor: "weight",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value}</span>;
            }
         },
      },
      {
         header: "LILA",
         accessor: "lila",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value}</span>;
            }
         },
      },
      {
         header: "Usia Kehamilan",
         accessor: "gestationalAge",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value}</span>;
            }
         },
      },
      {
         header: "Pengukuran DJJ",
         accessor: "measurementDjj",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value}</span>;
            }
         },
      },
   ];

   if (isLoading) {
      return <Loading />;
   }

   if (!isLoading && res?.data) {
      return <TableData title={"List Record Antenatal (" + res?.data.name + ")"} columns={COLUMNS} data={res?.data.antenatal} isBack={!isLoading && res?.data.antenatal ? true : false} />;
   }
};

export default AntenatalDetailTable;
