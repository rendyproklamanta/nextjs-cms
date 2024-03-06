'use client';

/* eslint-disable react/display-name */
import React from "react";
import { useDeleteUserMutation, useGetUserAllQuery } from "@/src/store/api/userApi";
import TableData from "@/src/components/TableData";
import Tooltip from "@/src/components/ui/Tooltip";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import moment from "moment/moment";
import Swal from "sweetalert2";
import Loading from "@/src/app/loading";

const UserTable = () => {
   const { isLoading, data: res, refetch } = useGetUserAllQuery();

   useEffect(() => {
      refetch();
   }, [refetch]);

   const [deleteUser] = useDeleteUserMutation();

   const handleDelete = (id) => {
      Swal.fire({
         title: 'Yakin untuk menghapus data ini?',
         icon: 'info',
         confirmButtonText: 'Konfirmasi',
         showCancelButton: true,
      }).then((result) => {
         if (result['isConfirmed']) {
            deleteUser(id).unwrap()
               .then((res) => {
                  if (res.success) {
                     Swal.fire(
                        'Success',
                        'User Berhasil Dihapus',
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
         header: "username",
         accessor: "username",
         Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
         },
      },
      {
         header: "nama",
         accessor: "name",
         Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
         },
      },
      {
         header: "NAMA PRAKTEK MANDIRI BIDAN (PMB)",
         accessor: "pmb",
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
      return <TableData title={"List User"} columns={COLUMNS} data={res?.data} />;
   }
};

export default UserTable;
