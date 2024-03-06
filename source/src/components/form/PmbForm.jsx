"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/src/components/ui/Textinput";
import Card from "@/src/components/ui/Card";
import { useCreatePmbMutation, useGetPmbQuery, useUpdatePmbMutation } from "@/src/store/api/pmbApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const FormValidationSchema = yup.object({
   namePmb: yup.string().trim().required("Nama PMB wajib diisi"),
   nameMidwife: yup.string().trim().required("Nama bidan wajib diisi"),
   education: yup.string().trim().required("Pendidikan terakhir wajib diisi"),
}).required();

const PmbForm = ({ params }) => {
   const { isLoading, data: res, refetch } = useGetPmbQuery(params?.id, { skip: params?.id === undefined });
   const [createPmb] = useCreatePmbMutation();
   const [updatePmb] = useUpdatePmbMutation();
   const router = useRouter();
   const page = 'pmb';

   const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
   } = useForm({
      resolver: yupResolver(FormValidationSchema),
      mode: "all",
   });

   useEffect(() => {
      if (!isLoading && res?.data) {
         setValue("namePmb", res.data.namePmb);
         setValue("nameMidwife", res.data.nameMidwife);
         setValue("education", res.data.education);
      }
   }, [setValue, isLoading, res]);

   const onSubmit = (data) => {
      const formData = {
         namePmb: data.namePmb,
         nameMidwife: data.nameMidwife,
         education: data.education,
      };

      console.log("🚀 ~ file: page.jsx:65 ~ onSubmit ~ post:", formData);

      if (!isLoading && res) {
         updatePmb({ id: res.data._id, payload: formData }).unwrap()
            .then((res) => {
               if (res.success) {
                  Swal.fire(
                     'Success',
                     `${page} Berhasil Diupdate`,
                     'success'
                  );
                  router.push(`/${page}/list`);
                  refetch();
               }
            }).catch((error) => {
               Swal.fire(
                  'Failed!',
                  error.data.message,
                  'error'
               );
            });
      } else {
         createPmb(formData).unwrap()
            .then((res) => {
               if (res.success) {
                  Swal.fire(
                     'Success',
                     `${page} Berhasil Ditambahkan`,
                     'success'
                  );
                  router.push(`/${page}/list`);
               }
            }).catch((error) => {
               Swal.fire(
                  'Failed!',
                  error.data.message,
                  'error'
               );
            });
      }
   };


   return (
      <Card title={`${!isLoading && res?.data ? `Edit ${page}` : `Tambah ${page}`}`}>
         <form onSubmit={handleSubmit(onSubmit)} className="lg:grid-cols-2 grid gap-5 grid-cols-1">
            <div className="my-1">
               <Textinput
                  name="namePmb"
                  label="Nama PMB"
                  type="text"
                  placeholder="Masukkan nama PMB"
                  register={register}
                  error={errors.namePmb} />
            </div>
            <div className="my-1">
               <Textinput
                  name="nameMidwife"
                  label="Nama Bidan"
                  type="text"
                  placeholder="Masukkan Nama Bidan"
                  register={register}
                  error={errors.nameMidwife} />
            </div>
            <div className="my-1">
               <Textinput
                  name="education"
                  label="Pendidikan terakhir Bidan"
                  type="text"
                  placeholder="Masukkan Pendidikan Bidan"
                  register={register}
                  error={errors.education} />
            </div>
            <div className="lg:col-span-2 col-span-1 pt-3 text-center flex justify-between">
               <span className="btn btn-secondary w-[150px] cursor-pointer" onClick={() => router.back()}>{'< Kembali'}</span>
               <button type="submit" className="btn btn-dark w-[150px]">Simpan Data</button>
            </div>
         </form>
      </Card>
   );
};

export default PmbForm;
