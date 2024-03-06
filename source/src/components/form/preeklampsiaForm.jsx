"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import FormGroup from "../ui/FormGroup";
import Image from "next/image";
import Select from "../ui/Select";
import { useGetPatientDropdownQuery, useGetPatientQuery } from "@/src/store/api/patientApi";
import { useCreatePreeklampsiaMutation, useGetPreeklampsiaAllQuery, useGetPreeklampsiaQuery, useUpdatePreeklampsiaMutation } from "@/src/store/api/preeklampsiaApi";
import { useRouter } from "next/navigation";
import { preeklampsiaResult } from "@/src/configs/constants";
import { optionspreeklampsia, preeklamsiaVal } from "@/src/constant/preeklamsiaOptions";
import { calculateAge } from "@/src/app/utils/calculateAge";
import { useGetAntenatalQuery } from "@/src/store/api/antenatalApi";

// VALIDATION
const formValidation = yup.object({
   idPatient: yup.string().trim().required("Pasien wajib diisi"),
   // preeklampsia: yup.array().min(1).of(yup.string().required()).required(),
}).required();

const PreeklampsiaForm = ({ params }) => {
   // Call API
   const { data: dataPatient } = useGetPatientQuery(params?.id, { skip: params?.id === undefined });
   const { data: dataPreeklampsia } = useGetPreeklampsiaQuery(params?.id, { skip: params?.id === undefined });
   const { data: dataAntenatal } = useGetAntenatalQuery(params?.id, { skip: params?.id === undefined });
   const { data: dataDropdownPatient } = useGetPatientDropdownQuery();
   const { refetch } = useGetPreeklampsiaAllQuery();

   const [createPreeklampsia] = useCreatePreeklampsiaMutation();
   const [updatePreeklampsia] = useUpdatePreeklampsiaMutation();

   // Checkbox
   const [checkedPreeklampsia, setCheckedPreeklampsia] = useState([]);
   const [checkedPreeklampsiaScore, setCheckedPreeklampsiaScore] = useState([]);

   // Result
   const [isAnalyze, setIsAnalyze] = useState(false);
   const [isDisabled, setIsDisabled] = useState(true);
   const [result, setResult] = useState('');
   const [noResult, setNoResult] = useState(true);

   const page = 'preeklampsia';
   const values = dataPreeklampsia?.data;
   const router = useRouter();

   // REACT FORM
   const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      reset,
   } = useForm({
      resolver: yupResolver(formValidation),
      mode: "all",
      values
   });

   const onSubmit = (data) => {
      if (isAnalyze) return;
      if (isDisabled) return;

      setIsAnalyze(true);
      setIsDisabled(true);
      setNoResult(false);
      setResult('');

      setTimeout(() => {

         const totalScore = checkedPreeklampsiaScore.reduce((a, b) => a + b, 0);

         let resultNow = '';
         if (totalScore && totalScore >= 200) {
            resultNow = 'danger';
            setResult(resultNow);
         } else if (totalScore && totalScore < 200) {
            resultNow = 'medium';
            setResult(resultNow);
         } else {
            resultNow = 'normal';
            setResult(resultNow);
         }

         const formData = {
            'uid': Date.now(),
            'val': data.preeklampsia,
            'score': checkedPreeklampsiaScore,
            'result': resultNow
            // 'createdAt': new Date().toISOString(),
         };

         console.log("🚀 ~ file: page.jsx:65 ~ onSubmit ~ post:", formData);

         if (dataPreeklampsia && dataPreeklampsia?.data?._id) {
            updatePreeklampsia({ id: dataPreeklampsia?.data?._id, payload: formData }).unwrap()
               .then((res) => {
                  if (res.success) {
                     Swal.fire(
                        'Success',
                        `${page} Berhasil Diupdate`,
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
         } else {
            createPreeklampsia({ id: data.idPatient, payload: formData }).unwrap()
               .then((res) => {
                  if (res.success) {
                     Swal.fire(
                        'Success',
                        `${page} Berhasil Ditambahkan`,
                        'success'
                     );
                     resetForm();
                     refetch();
                  }
               }).catch((error) => {
                  console.log("🚀 ~ file: AntenatalForm.jsx:183 ~ .then ~ error:", error);
                  Swal.fire(
                     'Failed!',
                     error.data.message,
                     'error'
                  );
               });
         }

         setIsAnalyze(false);
         setIsDisabled(false);

      }, 5000);

   };

   // Set value checkbox for pass to formData
   useEffect(() => {
      setValue("preeklampsia", checkedPreeklampsia);
   }, [setValue, checkedPreeklampsia]);

   // Set value options
   useEffect(() => {
      if (dataPatient?.data && dataDropdownPatient) {
         setValue("idPatient", dataPatient?.data?._id);
      }
   }, [setValue, dataDropdownPatient, dataPatient]);

   // Set value checklist to checkbox
   useEffect(() => {
      if (params?.id) {
         if (dataPatient && !dataPatient?.data?._id) {
            Swal.fire(
               'Failed!',
               'Data pasien tidak ditemukan!',
               'error'
            );
            return;
         }

         if (dataAntenatal && !dataAntenatal?.data?._id) {
            Swal.fire(
               'Failed!',
               'Data antenatal pasien belum diisi!',
               'error'
            );
            return;
         }

         // Checklist condition
         let getScorePreeklamsia = [];
         let getCheckedPreeklamsia = [];

         // Get data patient
         if (dataPatient?.data?.isFirstHusband === 'no') {
            getCheckedPreeklamsia.push('val1');
            getScorePreeklamsia.push(preeklamsiaVal('val1').score);
         }

         if (dataPatient?.data?.pregnancyProcess === 'ivf') {
            getCheckedPreeklamsia.push('val2');
            getScorePreeklamsia.push(preeklamsiaVal('val2').score);
         }

         if (dataPatient?.data?.dob) {
            const age = calculateAge(dataPatient?.data?.dob);
            if (age >= 35) {
               getCheckedPreeklamsia.push('val3');
               getScorePreeklamsia.push(preeklamsiaVal('val3').score);
            }
         }

         if (dataPatient?.data?.pregnancyPreviousInterval >= 10) {
            getCheckedPreeklamsia.push('val4');
            getScorePreeklamsia.push(preeklamsiaVal('val4').score);
         }

         if (dataPatient?.data?.isPreeklamsiaHistory === 'yes') {
            getCheckedPreeklamsia.push('val5');
            getScorePreeklamsia.push(preeklamsiaVal('val5').score);
         }

         if (dataPatient?.data?.isPreeklamsiaHistory === 'yes') {
            getCheckedPreeklamsia.push('val7');
            getScorePreeklamsia.push(preeklamsiaVal('val7').score);
         }

         if (dataPatient?.data?.isPregnancyTwin === 'yes') {
            getCheckedPreeklamsia.push('val8');
            getScorePreeklamsia.push(preeklamsiaVal('val8').score);
         }

         // Get data antenatal
         const getLatestAntenatal = dataAntenatal?.data?.antenatal[dataAntenatal?.data?.antenatal.length - 1]; // get last array

         if (getLatestAntenatal?.weight >= 80) {
            getCheckedPreeklamsia.push('val6');
            getScorePreeklamsia.push(preeklamsiaVal('val6').score);
         }

         if (getLatestAntenatal?.bloodPressureSistole >= 140 && getLatestAntenatal.bloodPressureDiastole >= 90) {
            getCheckedPreeklamsia.push('val10');
            getScorePreeklamsia.push(preeklamsiaVal('val10').score);
         }

         if (getLatestAntenatal?.testUrine === 'protein') {
            getCheckedPreeklamsia.push('val15');
            getScorePreeklamsia.push(preeklamsiaVal('val15').score);
         }

         if (dataAntenatal?.data?._id && dataPatient?.data?._id) {
            setIsDisabled(false);

            setCheckedPreeklampsia(getCheckedPreeklamsia);
            setCheckedPreeklampsiaScore(getScorePreeklamsia);
            // const sum = getScorePreeklamsia.reduce((total, num) => total + num, 0);
            // console.log("🚀 ~ file: preeklampsiaForm.jsx:180 ~ useEffect ~ sum:", sum)

            // auto get from database value
            //setCheckedPreeklampsia(res.data.preeklampsia[0].val);
            //setCheckedPreeklampsiaScore(res.data.preeklampsia[0].score);
         }
      }
   }, [setValue, dataPatient, dataAntenatal, params]);

   const resetResult = () => {
      setIsDisabled(false);
      setIsAnalyze(false);
      setNoResult(true);
      setResult('');
   };

   const resetForm = () => {
      if (isAnalyze) return;
      if (isDisabled) return;

      router.push('/preeklampsia');
      reset();
      setCheckedPreeklampsia([]);
      setCheckedPreeklampsiaScore([]);
   };

   const handleChangePatient = (e) => {
      if (e.target) {
         const selectedValue = e.target.value;
         router.push(`/preeklampsia/${selectedValue}`);
      }

      setCheckedPreeklampsia([]);
      setCheckedPreeklampsiaScore([]);
      resetResult();
   };

   let imageSrc = '';
   if (result === 'danger') {
      imageSrc = '/assets/images/4223811.png';
   } else if (result === 'medium') {
      imageSrc = '/assets/images/9355975.png';
   } else {
      imageSrc = '/assets/images/102649.png';
   }

   return (
      <div>
         <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <Card>
               <div className="space-y-3">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                     <Select
                        name='idPatient'
                        label="Nama Pasien"
                        className="capitalize"
                        placeholder="-- Silahkan Pilih Pasien --"
                        register={register}
                        options={dataDropdownPatient}
                        error={errors.idPatient}
                        //disabled={!isLoading && res?.data ? true : isAnalyze ? true : false}
                        defaultValue={''}
                        onChange={handleChangePatient}
                     />
                     <FormGroup
                        // label="Centang pilihan berikut ini (optional)"
                        label="Checklist akan otomatis terisi setelah memilih pasien"
                        error={errors.preeklampsia}
                        errorToggle={checkedPreeklampsia ? true : false}
                     >
                        <div className="space-y-1">
                           {optionspreeklampsia.map((option, i) => (
                              <Checkbox
                                 key={i}
                                 // disabled={isAnalyze}
                                 name="preeklampsia"
                                 label={option.label}
                                 value={checkedPreeklampsia.includes(option.value)}
                                 readOnly // set readonly if no onchange

                              //# Disable onchange because use conditionally instead
                              // onChange={() => {
                              //    if (checkedPreeklampsia.includes(option.value)) {
                              //       setCheckedPreeklampsia(checkedPreeklampsia.filter((item) => item !== option.value));
                              //       setCheckedPreeklampsiaScore(checkedPreeklampsiaScore.filter((item) => item !== option.score));
                              //    } else {
                              //       setCheckedPreeklampsia([...checkedPreeklampsia, option.value]);
                              //       setCheckedPreeklampsiaScore([...checkedPreeklampsiaScore, option.score]);
                              //    }
                              // }}
                              />

                           ))}

                           {/* {checkedPreeklampsia.length > 0 && (
                              <div className="text-slate-900 dark:text-white">
                                 Dipilih : <span className="uppercase">{checkedPreeklampsia.join(", ")}</span>
                                 <br />
                                 Score : <span className="uppercase">{checkedPreeklampsiaScore.join(", ")}</span>
                              </div>
                           )} */}

                        </div>
                     </FormGroup>

                     <div className="lg:col-span-2 col-span-1 text-center flex justify-between">
                        <Button
                           text="reset"
                           icon="heroicons-outline:x-mark"
                           className="btn-secondary"
                           onClick={() => resetForm()}
                           disabled={isDisabled}
                           type="button"
                        />
                        <Button
                           text="submit"
                           icon="heroicons-outline:check"
                           className="btn-dark"
                           type={`${isDisabled ? 'button' : 'submit'}`}
                           disabled={isDisabled}
                        />
                     </div>
                  </form>
               </div>
            </Card>

            <Card
               bgColor={`
               ${result === 'danger' ? 'bg-red-500 dark:bg-red-500' :
                     result === 'medium' ? 'bg-yellow-300 dark:bg-yellow-300' :
                        result === 'normal' ? 'bg-green-400 dark:bg-green-400' :
                           'bg-white dark:bg-slate-800'
                  }
                `}
               className={`flex justify-center items-center`}>
               <div className="space-y-20 flex flex-col justify-center items-center">

                  {isAnalyze && (
                     <>
                        <h3>Sedang Menganalisa</h3>
                        <div className="animate-spin rounded-full" role="status">
                           <Image src="/assets/images/loader-blue.png" alt="" width={300} height={0} />
                        </div>
                        <h3>Mohon Menungggu...</h3>
                     </>
                  )}

                  {noResult && (
                     <>
                        <Image src="/assets/images/9049605.png" alt="" width={300} height={0} className="animate-bounce" />
                        <h3 className="font-semibold dark:text-white">Belum ada hasil analisa</h3>
                     </>
                  )}

                  {result && (
                     <>
                        <Image src={imageSrc} alt="" width={300} height={0} />
                        <h3 className="font-semibold dark:text-black-500">{preeklampsiaResult(result)}</h3>
                     </>
                  )}

               </div>
            </Card>
         </div>

      </div >
   );
};

export default PreeklampsiaForm;
