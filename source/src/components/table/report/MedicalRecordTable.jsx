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
import 'moment/locale/id';
import Loading from "@/src/app/loading";
import { useDeleteMedicalMutation, useGetMedicalAllQuery } from "@/src/store/api/medicalApi";

const MedicalRecordTable = () => {
   const { isLoading, data: res, refetch } = useGetMedicalAllQuery();

   useEffect(() => {
      refetch();
   }, [refetch]);

   const [deleteMedical] = useDeleteMedicalMutation();

   const handleDelete = (id) => {
      Swal.fire({
         title: 'Yakin untuk menghapus data ini?',
         icon: 'info',
         confirmButtonText: 'Konfirmasi',
         showCancelButton: true,
      }).then((result) => {
         if (result['isConfirmed']) {
            deleteMedical(id).unwrap()
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
         header: "total e-rekam",
         accessor: "medical",
         Cell: (row) => {
            if (row?.cell?.value) {
               return <span>{row?.cell?.value.length}</span>;
            }
         },
      },
      {
         id: "kunjungan terakhir", // add unique id here
         header: "e-rekam terakhir",
         accessor: "medical",
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
                     <Link href={'/report/medical/view/' + row?.cell?.value}>
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
      return <TableData title={"List E-rekam"} columns={COLUMNS} data={res?.data} />;
   }
};

export default MedicalRecordTable;
