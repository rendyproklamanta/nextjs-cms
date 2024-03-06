"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/src/components/ui/Textinput";
import Card from "@/src/components/ui/Card";
import { useCreateDiagnosisMutation, useGetDiagnosisQuery, useUpdateDiagnosisMutation } from "@/src/store/api/diagnosisApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const FormValidationSchema = yup.object({
   icd: yup.string().trim().required("Kode ICD wajib diisi"),
   diagnostic: yup.string().trim().required("Nama diagnosa wajib diisi"),
}).required();

const DiagnosisForm = ({ params }) => {
   const { isLoading, data: res, refetch } = useGetDiagnosisQuery(params?.id, { skip: params?.id === undefined });
   const [createDiagnosis] = useCreateDiagnosisMutation();
   const [updateDiagnosis] = useUpdateDiagnosisMutation();
   const router = useRouter();
   const page = 'diagnosis';

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
         setValue("icd", res.data.icd);
         setValue("diagnostic", res.data.diagnostic);
      }
   }, [setValue, isLoading, res]);

   const onSubmit = (data) => {
      const formData = {
         icd: data.icd,
         diagnostic: data.diagnostic,
      };

      console.log("🚀 ~ file: page.jsx:65 ~ onSubmit ~ post:", formData);

      if (!isLoading && res) {
         updateDiagnosis({ id: res.data._id, payload: formData }).unwrap()
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
         createDiagnosis(formData).unwrap()
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
                  name="icd"
                  label="Kode ICD"
                  type="text"
                  placeholder="Masukkan Kode ICD"
                  register={register}
                  error={errors.icd} />
            </div>
            <div className="my-1">
               <Textinput
                  name="diagnostic"
                  label="Nama Diagnosa"
                  type="text"
                  placeholder="Masukkan Nama Diagnosa"
                  register={register}
                  error={errors.diagnostic} />
            </div>
            <div className="lg:col-span-2 col-span-1 pt-3 text-center flex justify-between">
               <span className="btn btn-secondary w-[150px] cursor-pointer" onClick={() => router.back()}>{'< Kembali'}</span>
               <button type="submit" className="btn btn-dark w-[150px]">Simpan Data</button>
            </div>
         </form>
      </Card>
   );
};

export default DiagnosisForm;
