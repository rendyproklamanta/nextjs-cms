'use client';

/* eslint-disable react/display-name */
import React from "react";
import TableData from "@/src/components/TableData";
import Tooltip from "@/src/components/ui/Tooltip";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { useDeleteAntenatalMutation, useGetAntenatalAllQuery } from "@/src/store/api/antenatalApi";
import Loading from "@/src/app/loading";

const AntenatalTable = () => {
   const { isLoading, data: res, refetch } = useGetAntenatalAllQuery();

   useEffect(() => {
      refetch();
   }, [refetch]);

   const [deleteAntenatal] = useDeleteAntenatalMutation();

   const handleDelete = (id) => {
      Swal.fire({
         title: 'Yakin untuk menghapus data ini?',
         icon: 'info',
         confirmButtonText: 'Konfirmasi',
         showCancelButton: true,
      }).then((result) => {
         if (result['isConfirmed']) {
            deleteAntenatal(id).unwrap()
               .then((res) => {
                  if (res.success) {
                     Swal.fire(
                        'Success',
                        'Berhasil Dihapus',
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
         header: "total pengecekan",
         accessor: "antenatal",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value.length}</span>;
            }
         },
      },
      {
         id: "kunjungan terakhir", // add unique id here
         header: "pengecekan terakhir",
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
      return <Loading />;
   }


   if (!isLoading && res?.data) {
      return <TableData title={"List Pasien Antenatal"} columns={COLUMNS} data={res?.data} />;
   }
};

export default AntenatalTable;
