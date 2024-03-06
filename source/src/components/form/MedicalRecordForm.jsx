"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Card from "../ui/Card";
import Select from "../ui/Select";
import { useGetPatientDropdownQuery } from "@/src/store/api/patientApi";
import { useGetAntenatalDropdownQuery } from "@/src/store/api/antenatalApi";
import { useCreateMedicalMutation, useGetMedicalAllQuery, useGetMedicalQuery, useUpdateMedicalMutation } from "@/src/store/api/medicalApi";
import { useGetPreeklampsiaDropdownQuery } from "@/src/store/api/preeklampsiaApi";
import { useGetPmbDropdownQuery } from "@/src/store/api/pmbApi";


// VALIDATION
const validationSchema = yup.object({
   idPatient: yup.string().trim().required("Pasien wajib diisi"),
   idPmb: yup.string().trim().required("PMB wajib diisi"),
   idAntenatal: yup.string().trim().required("Antenatal wajib diisi"),
   idPreeklampsia: yup.string().trim().required("Preeklampsia wajib diisi"),
}).required();

const MedicalRecordForm = ({ params }) => {
   const { refetch } = useGetMedicalAllQuery();
   const { isLoading, data: res } = useGetMedicalQuery(params?.id, { skip: params?.id === undefined });

   const { isLoading: isLoadingPatient, data: resPatient } = useGetPatientDropdownQuery();
   const { isLoading: isLoadingPmb, data: resPmb } = useGetPmbDropdownQuery();

   const [idPatient, setIdPatient] = useState('');
   const { isLoading: isLoadingAntenatal, data: resAntenatal } = useGetAntenatalDropdownQuery(idPatient, { skip: idPatient === '' });
   const { isLoading: isLoadingPreeklampsia, data: resPreeklampsia } = useGetPreeklampsiaDropdownQuery(idPatient, { skip: idPatient === '' });

   const [createMedical] = useCreateMedicalMutation();
   const [updateMedical] = useUpdateMedicalMutation();

   const router = useRouter();
   const page = 'e-rekam';
   const values = !isLoading && res?.data;

   // REACT FORM
   const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      reset,
   } = useForm({
      resolver: yupResolver(validationSchema),
      mode: "all",
      values
   });

   const onSubmit = (data) => {
      const formData = {
         'uid': Date.now(),
         ...data
      };

      if (!isLoading && res?.data) {
         updateMedical({ id: res.data._id, payload: formData }).unwrap()
            .then((res) => {
               if (res.success) {
                  Swal.fire(
                     'Success',
                     `${page} Berhasil Diupdate`,
                     'success'
                  );
                  router.push(`/${page}`);
               }
            }).catch((error) => {
               Swal.fire(
                  'Failed!',
                  error.data.message,
                  'error'
               );
            });
      } else {
         createMedical({ id: data.idPatient, payload: formData }).unwrap()
            .then((res) => {
               if (res.success) {
                  Swal.fire(
                     'Success',
                     `${page} Berhasil Ditambahkan`,
                     'success'
                  );
                  resetForm();
               }
            }).catch((error) => {
               console.log("🚀 ~ file: MedicalRecordForm.jsx:183 ~ .then ~ error:", error);
               Swal.fire(
                  'Failed!',
                  error.data.message,
                  'error'
               );
            });
      }
   };

   const resetForm = () => {
      reset();
      refetch();
   };

   const handlePatient = async (e) => {
      setValue("idAntenatal", '');
      setValue("idPreeklampsia", '');
      setIdPatient(e.target.value);
   };

   return (
      <div>
         <Card title={`${!isLoading && res ? 'Edit Form' : 'Tambah '} ${page}`} isBack={!isLoading && res ? true : false}>

            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="lg:grid-cols-2 grid gap-5 grid-cols-1 mb-7">
                  <Select
                     name='idPatient'
                     label="Pilih Pasien"
                     className="capitalize"
                     placeholder="-- Silahkan Pilih Pasien --"
                     register={register}
                     onChange={handlePatient}
                     options={!isLoadingPatient && resPatient}
                     error={errors.idPatient}
                     defaultValue={''}
                  />
                  <Select
                     name='idAntenatal'
                     label="Pilih Antenatal by UID"
                     className="capitalize"
                     placeholder="-- Plih Antenatal --"
                     register={register}
                     options={!isLoadingAntenatal && resAntenatal}
                     error={errors.idAntenatal}
                     defaultValue={''}
                  />
                  <Select
                     name='idPreeklampsia'
                     label="Pilih Preeklampsia By UID"
                     className="capitalize"
                     placeholder="-- Pilih Preeklampsia --"
                     register={register}
                     options={!isLoadingPreeklampsia && resPreeklampsia}
                     error={errors.idPreeklampsia}
                     defaultValue={''}
                  />
                  <Select
                     name='idPmb'
                     label="Pilih PMB & Bidan"
                     className="capitalize"
                     placeholder="-- Pilih PMB --"
                     register={register}
                     options={!isLoadingPmb && resPmb}
                     error={errors.idPmb}
                     defaultValue={''}
                  />
               </div>
               <div className="lg:col-span-2 col-span-1 pt-3 text-center md:text-right">
                  <button type="submit" className="btn btn-dark w-[150px]">Simpan Data</button>
               </div>
            </form>

         </Card>
      </div >
   );
};

export default MedicalRecordForm;
