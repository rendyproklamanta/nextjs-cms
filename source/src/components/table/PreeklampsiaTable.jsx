'use client';

/* eslint-disable react/display-name */
import React from "react";
import TableData from "@/src/components/TableData";
import Tooltip from "@/src/components/ui/Tooltip";
// import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import moment from "moment/moment";
import Swal from "sweetalert2";
import { useDeletePreeklampsiaMutation, useGetPreeklampsiaAllQuery } from "@/src/store/api/preeklampsiaApi";
import { useRouter } from "next/navigation";
import Loading from "@/src/app/loading";
import { preeklampsiaResult } from "@/src/configs/constants";

const PreeklampsiaTable = () => {
   const { isLoading, data: res, refetch } = useGetPreeklampsiaAllQuery();
   const router = useRouter();

   useEffect(() => {
      refetch();
   }, [refetch]);

   const [deletePreeklampsia] = useDeletePreeklampsiaMutation();

   const handleDelete = (id) => {
      Swal.fire({
         title: 'Yakin untuk menghapus data ini?',
         icon: 'info',
         confirmButtonText: 'Konfirmasi',
         showCancelButton: true,
      }).then((result) => {
         if (result['isConfirmed']) {
            deletePreeklampsia(id).unwrap()
               .then((res) => {
                  if (res.success) {
                     Swal.fire(
                        'Success',
                        'Berhasil Dihapus',
                        'success'
                     );
                     router.push(`/preeklampsia`);
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
         header: "UID",
         accessor: "preeklampsia",
         Cell: (row) => {
            if (row?.cell?.value) {
               var lastArray = row?.cell?.value.slice(-1)[0];
               return <span>#{lastArray.uid}</span>;
            }
         },
      },
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

         id: "tanggal", // add unique id here
         header: "tanggal",
         accessor: "preeklampsia",
         Cell: (row) => {
            if (row?.cell?.value) {
               var lastArray = row?.cell?.value.slice(-1)[0];
               return <span>{moment(lastArray.createdAt).format('dddd, DD-MM-YYYY HH:mm') + ' WIB'}</span>;
            }
         },
      },
      {
         id: "result", // add unique id here
         header: "hasil pengecekan terakhir",
         accessor: "preeklampsia",
         Cell: (row) => {
            if (row?.cell?.value) {
               var lastArray = row?.cell?.value.slice(-1)[0];
               return <span>{preeklampsiaResult(lastArray.result)}</span>;
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
                  {/* <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                     <Link href={'/preeklampsia/' + row?.cell?.value}>
                        <button className="action-btn" type="button">
                           <Icon icon="heroicons:pencil-square" />
                        </button>
                     </Link>
                  </Tooltip> */}
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
      return <TableData title={"List Preeklampsia"} columns={COLUMNS} data={res?.data} />;
   }
};

export default PreeklampsiaTable;
