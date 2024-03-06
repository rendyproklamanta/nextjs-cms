'use client';

/* eslint-disable react/display-name */
import React from "react";
import { useDeletePmbMutation, useGetPmbAllQuery } from "@/src/store/api/pmbApi";
import TableData from "@/src/components/TableData";
import Tooltip from "@/src/components/ui/Tooltip";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import moment from "moment/moment";
import Swal from "sweetalert2";

const PmbTable = () => {
   const { isLoading, data: res, refetch } = useGetPmbAllQuery();

   useEffect(() => {
      refetch();
   }, [refetch]);

   const [deletePmb] = useDeletePmbMutation();

   const handleDelete = (id) => {
      Swal.fire({
         title: 'Yakin untuk menghapus data ini?',
         icon: 'info',
         confirmButtonText: 'Konfirmasi',
         showCancelButton: true,
      }).then((result) => {
         if (result['isConfirmed']) {
            deletePmb(id).unwrap()
               .then((res) => {
                  if (res.success) {
                     Swal.fire(
                        'Success',
                        'PMB Berhasil Dihapus',
                        'success'
                     );
                     refetch();
                  }
               }).catch((error) => {
                  Swal.fire(
                     'Failed!',
                     error.data.message,
                     'error'
                  );
               });
         }
      });
   };

   const COLUMNS = [
      {
         header: "Nama PMB",
         accessor: "namePmb",
         Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
         },
      },
      {
         header: "nama bidan",
         accessor: "nameMidwife",
         Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
         },
      },
      {
         header: "Pendidikan terakhir",
         accessor: "education",
         Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
         },
      },
      {
         header: "tanggal dibuat",
         accessor: "createdAt",
         Cell: (row) => {
            return <span>{moment(row?.cell?.value).format('DD-MM-YYYY')}</span>;
         },
      },
      {
         header: "action",
         accessor: "_id",
         // eslint-disable-next-line no-unused-vars
         Cell: (row) => {
            return (
               <div className="flex justify-center space-x-3 rtl:space-x-reverse">
                  <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                     <Link href={row?.cell?.value}>
                        <button className="action-btn" type="button">
                           <Icon icon="heroicons:pencil-square" />
                        </button>
                     </Link>
                  </Tooltip>
                  <Tooltip
                     content="Delete"
                     placement="top"
                     arrow
                     animation="shift-away"
                     theme="danger"
                  >
                     <button className="action-btn" type="button" onClick={() => handleDelete(row?.cell?.value)}>
                        <Icon icon="heroicons:trash" />
                     </button>
                  </Tooltip>
               </div>
            );
         },
      },
   ];

   if (isLoading) {
      return <>loading</>;
   }

   if (res?.data) {
      return <TableData title={"List PMB"} columns={COLUMNS} data={res?.data} />;
   }
};

export default PmbTable;
