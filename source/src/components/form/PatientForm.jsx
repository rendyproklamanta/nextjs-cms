"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/src/components/ui/Textinput";
import Card from "@/src/components/ui/Card";
import Textarea from "@/src/components/ui/Textarea";
import FormGroup from "@/src/components/ui/FormGroup";
import Swal from "sweetalert2";
import Select from "@/src/components/ui/Select";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useGetProvinceQuery, useGetRegencyQuery, useGetSubdistrictQuery } from "@/src/store/api/addressApi";
import { useCreatePatientMutation, useGetPatientQuery, useUpdatePatientMutation } from "@/src/store/api/patientApi";
import RadioBox from "../ui/RadioBox";

const FormValidationSchema = yup.object({
   norm: yup.number().required("Norm wajib diisi"),
   name: yup.string().trim().required("Nama pasien wajib diisi"),
   pob: yup.string().trim().required("Tempat Lahir wajib diisi"),
   dob: yup.string().trim().required("Tanggal Lahir wajib diisi"),
   gender: yup.string().trim().required("Jenis kelamin wajib diisi"),
   address: yup.string().trim().required("Alamat wajib diisi"),
   province: yup.string().trim().required("Provinsi wajib diisi"),
   regency: yup.string().trim().required("Kabupaten wajib diisi"),
   subdistrict: yup.string().trim().required("Kecamatan wajib diisi"),
   rt: yup.number().required("RT wajib diisi"),
   rw: yup.number().required("Rw wajib diisi"),
   education: yup.string().trim().required("Pendidikan wajib diisi"),
   job: yup.string().trim().required("Pekerjaan wajib diisi"),
   father: yup.string().trim().required("Nama suami/Ayah wajib diisi"),
   pregnancy: yup.number().required("Kehamilan ke wajib diisi"),
   miscarriage: yup.number().required("Riwayat Keguguran ke wajib diisi"),
   isFirstHusband: yup.string().trim().required("Suami keberapa wajib diisi"),
   pregnancyProcess: yup.string().trim().required("Proses kehamilan wajib diisi"),
   isPregnancyTwin: yup.string().trim().required("Kehamilan kembar wajib diisi"),
   pregnancyPreviousInterval: yup.number().required("Jarak Kehamilan Sebelumnya wajib diisi"),
   isPreeklamsiaHistory: yup.string().trim().required("Pernah Mengalami Preeklamsia wajib diisi"),
}).required();

const PatientForm = ({ params }) => {
   // Radio State
   const [gender, setGender] = useState('');
   const [isFirstHusband, setIsFirstHusband] = useState('');
   const [pregnancyProcess, setPregnancyProcess] = useState('');
   const [isPregnancyTwin, setIsPregnancyTwin] = useState('');
   const [isPreeklamsiaHistory, setIsPreeklamsiaHistory] = useState('');

   // Dropdown State
   const [idRegency, setIdRegency] = useState('');
   const [idSubdistrict, setIdSubdistrict] = useState('');

   // API
   const { isLoading, data: res, refetch } = useGetPatientQuery(params?.id, { skip: params?.id === undefined });
   const { isLoading: isLoadingProvince, data: resProvince } = useGetProvinceQuery();
   const { isLoading: isLoadingRegency, data: resRegency } = useGetRegencyQuery(idRegency, { skip: idRegency === '' });
   const { isLoading: isLoadingSubdistrict, data: resSubdistrict } = useGetSubdistrictQuery(idSubdistrict, { skip: idSubdistrict === '' });

   const [createPatient] = useCreatePatientMutation();
   const [updatePatient] = useUpdatePatientMutation();

   const router = useRouter();
   const page = 'patient';
   const values = !isLoading && res?.data;

   const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
   } = useForm({
      resolver: yupResolver(FormValidationSchema),
      mode: "all",
      values
   });

   useEffect(() => {
      if (!isLoading && res?.data) {
         const province = res.data.province.split(',');
         const regency = res.data.regency.split(',');

         if (!isLoadingProvince && resProvince) {
            setValue("province", res.data.province);
         }

         // Dropdown
         setIdRegency(province[0]);
         setIdSubdistrict(regency[0]);

         // Radio
         setGender(res.data.gender);
         setIsFirstHusband(res.data.isFirstHusband);
         setPregnancyProcess(res.data.pregnancyProcess);
         setIsPregnancyTwin(res.data.isPregnancyTwin);
         setIsPreeklamsiaHistory(res.data.isPreeklamsiaHistory);
      }
   }, [isLoading, res, isLoadingProvince, resProvince, setValue]);

   // Set value radio for pass to formdata
   useEffect(() => {
      setValue("gender", gender);
      setValue("isFirstHusband", isFirstHusband);
      setValue("pregnancyProcess", pregnancyProcess);
      setValue("isPregnancyTwin", isPregnancyTwin);
      setValue("isPreeklamsiaHistory", isPreeklamsiaHistory);
   }, [setValue, gender, isFirstHusband, pregnancyProcess, isPregnancyTwin, isPreeklamsiaHistory]);

   // Handle address
   const handleProvince = async (e) => {
      const val = e.target.value.split(',');
      setIdRegency(val[0]);
      setValue("regency", '');
      setValue("subdistrict", '');
      toast.success("Silahkan pilih Kabupaten", {
         position: "top-center",
         autoClose: 1000,
      });
   };

   const handleRegency = async (e) => {
      const val = e.target.value.split(',');
      setIdSubdistrict(val[0]);
      setValue("subdistrict", '');
      toast.success("Silahkan pilih Kecamatan", {
         position: "top-center",
         autoClose: 1000,
      });
   };

   // Subdmit formdata
   const onSubmit = (data) => {

      const formData = {
         ...data,
         // add object here if using checkbox
         gender: gender,
         isFirstHusband: isFirstHusband,
         pregnancyProcess: pregnancyProcess,
         isPregnancyTwin: isPregnancyTwin,
         isPreeklamsiaHistory: isPreeklamsiaHistory,
      };

      console.log("🚀 ~ file: page.jsx:65 ~ onSubmit ~ post:", formData);

      if (!isLoading && res?.data) {
         // UPDATE
         updatePatient({ id: res.data._id, payload: formData }).unwrap()
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
         // CREATE
         createPatient(formData).unwrap()
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
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">

               <div className="my-1">
                  <Textinput
                     name="norm"
                     min={0}
                     label="no RM"
                     type="number"
                     placeholder="123456789"
                     register={register}
                     error={errors.norm}
                  />
               </div>

               <div className="my-1">
                  <Textinput
                     name="name"
                     label="nama pasien"
                     type="text"
                     placeholder="Masukkan nama pasien"
                     register={register}
                     error={errors.name}
                  />
               </div>

               <div className="my-1">
                  <Textinput
                     name="pob"
                     label="Tempat Lahir"
                     type="text"
                     placeholder="Masukkan nama pasien"
                     register={register}
                     error={errors.pob}
                  />
               </div>

               <div className="my-1">
                  <Textinput
                     name="dob"
                     label="Tanggal Lahir"
                     type="date"
                     placeholder="Masukkan nama pasien"
                     register={register}
                     error={errors.dob}
                  />
               </div>

               <div className="my-1">
                  <FormGroup
                     label="Jenis Kelamin"
                     error={errors.gender}
                     errorToggle={gender === '' ? true : false}
                  >
                     <div className="grid lg:grid-cols-2 grid-cols-2 gap-x-5">
                        <RadioBox
                           label="Pria"
                           labelIcon="♂"
                           name="gender"
                           borderColor="peer-checked:border-blue-500 peer-checked:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-50"
                           textColor="text-blue-500"
                           padding='p-5'

                           value="pria"
                           checked={gender == 'pria'}
                           onChange={(e) => setGender(e.target.value)}
                           error={errors.gender}
                        />

                        <RadioBox
                           label="Wanita"
                           labelIcon="♀"
                           name="gender"
                           borderColor="peer-checked:border-pink-500 peer-checked:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-50"
                           textColor="text-pink-500"
                           padding='p-5'

                           value="wanita"
                           checked={gender == 'wanita'}
                           onChange={(e) => setGender(e.target.value)}
                           error={errors.gender}
                        />
                     </div>
                  </FormGroup>
               </div>

               <div className="my-1">
                  <Textarea
                     name="address"
                     label="Alamat"
                     type="text"
                     placeholder="Masukkan alamat"
                     register={register}
                     error={errors.address}
                     row="2"
                  />
               </div>

               <div className="my-1">
                  <Select
                     name='province'
                     label="Provinsi"
                     register={register}
                     options={!isLoadingProvince && resProvince}
                     onChange={handleProvince}
                     error={errors.province}
                     defaultValue={''}
                  />
               </div>

               <div className="my-1">
                  <Select
                     name='regency'
                     label="Kabupaten"
                     register={register}
                     options={!isLoadingRegency && resRegency}
                     onChange={handleRegency}
                     error={errors.regency}
                     defaultValue={''}
                  />
               </div>

               <div className="my-1">
                  <Select
                     name='subdistrict'
                     label="Kecamatan"
                     register={register}
                     options={!isLoadingSubdistrict && resSubdistrict}
                     error={errors.subdistrict}
                     defaultValue={''}
                  />
               </div>

               <div className="my-1">
                  <Textinput
                     name="rt"
                     label="RT"
                     type="number"
                     min={0}
                     placeholder="001"
                     register={register}
                     error={errors.rt}
                  />
               </div>

               <div className="my-1">
                  <Textinput
                     name="rw"
                     label="RW"
                     type="number"
                     min={0}
                     placeholder="001"
                     register={register}
                     error={errors.rw}
                  />
               </div>

               <div className="my-1">
                  <Textinput
                     name="education"
                     label="Pendidikan"
                     type="text"
                     placeholder="Masukkan pendidikan terakhir"
                     register={register}
                     error={errors.education}
                  />
               </div>

               <div className="my-1">
                  <Textinput
                     name="job"
                     label="Pekerjaan"
                     type="text"
                     placeholder="Masukkan pekerjaan"
                     register={register}
                     error={errors.job}
                  />
               </div>

               <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                  <div className="my-1">
                     <Textinput
                        name="father"
                        label="nama suami/ayah"
                        type="text"
                        placeholder="Masukkan nama suami/ayah"
                        register={register}
                        error={errors.father}
                     />
                  </div>
                  <div className="my-1">
                     <FormGroup
                        label="Apakah Suami Pertama?"
                        error={errors.isFirstHusband}
                        errorToggle={isFirstHusband === '' ? true : false}
                     >
                        <div className="grid lg:grid-cols-2 grid-cols-2 gap-x-5">
                           <RadioBox
                              label="Ya"
                              name="isFirstHusband"
                              value="yes"
                              checked={isFirstHusband === 'yes'}
                              onChange={(e) => setIsFirstHusband(e.target.value)}
                              error={errors.isFirstHusband}
                              padding='p-2'
                           />
                           <RadioBox
                              label="Tidak"
                              name="isFirstHusband"
                              value="no"
                              checked={isFirstHusband === 'no'}
                              onChange={(e) => setIsFirstHusband(e.target.value)}
                              error={errors.isFirstHusband}
                              padding='p-2'
                           />
                        </div>
                     </FormGroup>
                  </div>
               </div>

               <div className="my-1">
                  <Textinput
                     name="pregnancy"
                     label="Kehamilan ke -"
                     type="number"
                     min={0}
                     placeholder="0"
                     register={register}
                     error={errors.pregnancy}
                  />
               </div>
               <div className="my-1">
                  <FormGroup
                     label="Proses Kehamilan"
                     error={errors.pregnancyProcess}
                     errorToggle={pregnancyProcess === '' ? true : false}
                  >
                     <div className="grid lg:grid-cols-2 grid-cols-2 gap-x-5">
                        <RadioBox
                           label="Normal"
                           name="pregnancyProcess"
                           value="normal"
                           checked={pregnancyProcess === 'normal'}
                           onChange={(e) => setPregnancyProcess(e.target.value)}
                           error={errors.pregnancyProcess}
                           padding='p-2'
                        />
                        <RadioBox
                           label="Bayi Tabung"
                           name="pregnancyProcess"
                           value="ivf"
                           checked={pregnancyProcess === 'ivf'}
                           onChange={(e) => setPregnancyProcess(e.target.value)}
                           error={errors.pregnancyProcess}
                           padding='p-2'
                        />
                     </div>
                  </FormGroup>
               </div>
               <div className="my-1">
                  <FormGroup
                     label="Kehamilan Kembar?"
                     error={errors.isPregnancyTwin}
                     errorToggle={isPregnancyTwin === '' ? true : false}
                  >
                     <div className="grid lg:grid-cols-2 grid-cols-2 gap-x-5">
                        <RadioBox
                           label="Ya"
                           name="isPregnancyTwin"
                           value="yes"
                           checked={isPregnancyTwin === 'yes'}
                           onChange={(e) => setIsPregnancyTwin(e.target.value)}
                           error={errors.isPregnancyTwin}
                           padding='p-2'
                        />
                        <RadioBox
                           label="Tidak"
                           name="isPregnancyTwin"
                           value="no"
                           checked={isPregnancyTwin === 'no'}
                           onChange={(e) => setIsPregnancyTwin(e.target.value)}
                           error={errors.isPregnancyTwin}
                           padding='p-2'
                        />
                     </div>
                  </FormGroup>
               </div>
               <div className="my-1">
                  <FormGroup
                     label="pernah mengalami preeklamsia atau saudara yang mengalami?"
                     error={errors.isPreeklamsiaHistory}
                     errorToggle={isPreeklamsiaHistory === '' ? true : false}
                  >
                     <div className="grid lg:grid-cols-2 grid-cols-2 gap-x-5">
                        <RadioBox
                           label="Ya"
                           name="isPreeklamsiaHistory"
                           value="yes"
                           checked={isPreeklamsiaHistory == 'yes'}
                           onChange={(e) => setIsPreeklamsiaHistory(e.target.value)}
                           error={errors.isPreeklamsiaHistory}
                           padding='p-2'
                        />
                        <RadioBox
                           label="Tidak"
                           name="isPreeklamsiaHistory"
                           value="no"
                           checked={isPreeklamsiaHistory == 'no'}
                           onChange={(e) => setIsPreeklamsiaHistory(e.target.value)}
                           error={errors.isPreeklamsiaHistory}
                           padding='p-2'
                        />
                     </div>
                  </FormGroup>
               </div>
               <div className="my-1">
                  <Textinput
                     name="miscarriage"
                     label="riwayat keguguran"
                     type="number"
                     placeholder="Masukkan jumlah riwayat keguguran"
                     register={register}
                     error={errors.miscarriage}
                  />
               </div>
               <div className="my-1">
                  <Textinput
                     name="pregnancyPreviousInterval"
                     label="jarak kehamilan sebelumnya (tahun)"
                     type="number"
                     placeholder="Masukkan jumlah jarak kehamilan sebelumnya"
                     register={register}
                     error={errors.pregnancyPreviousInterval}
                  />
               </div>

            </div>

            <div className="lg:col-span-2 col-span-1 pt-3 text-center flex justify-between">
               <span className="btn btn-secondary w-[150px] cursor-pointer rounded-lg" onClick={() => router.back()}>{'< Kembali'}</span>
               <button type="submit" className="btn btn-dark w-[150px] rounded-lg">Simpan Data</button>
            </div>
         </form>
      </Card>
   );
};

export default PatientForm;
