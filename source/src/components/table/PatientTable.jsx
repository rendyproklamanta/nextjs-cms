'use client';

/* eslint-disable react/display-name */
import React from "react";
import { useDeletePatientMutation, useGetPatientAllQuery } from "@/src/store/api/patientApi";
import TableData from "@/src/components/TableData";
import Tooltip from "@/src/components/ui/Tooltip";
import Link from "next/link";
import { Icon } from "@iconify/react";
import moment from "moment/moment";
import Swal from "sweetalert2";
import Loading from "@/src/app/loading";

const PatientTable = () => {
   const { isLoading, data: res, refetch } = useGetPatientAllQuery();
   const [deletePatient] = useDeletePatientMutation();

   const handleDelete = (id) => {
      Swal.fire({
         title: 'Yakin untuk menghapus data ini?',
         icon: 'info',
         confirmButtonText: 'Konfirmasi',
         showCancelButton: true,
      }).then((result) => {
         if (result['isConfirmed']) {
            // DELETE
            deletePatient(id).unwrap()
               .then((res) => {
                  if (res.success) {
                     Swal.fire(
                        'Success',
                        'Pasien Berhasil Dihapus',
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
         header: "no rm",
         accessor: "norm",
         Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
         },
      },
      {
         header: "nama pasien",
         accessor: "name",
         Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
         },
      },
      {
         header: "jenis kelamin",
         accessor: "gender",
         Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
         },
      },
      {
         header: "pendidikan",
         accessor: "education",
         Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
         },
      },
      {
         header: "pekerjaan",
         accessor: "job",
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
      return <Loading />;
   }

   if (!isLoading && res?.data) {
      return <TableData title={"List Pasien"} columns={COLUMNS} data={res?.data} />;
   }
};

export default PatientTable;
