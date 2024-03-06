"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../ui/Card";
import Icons from "../ui/Icon";
import Textinput from "../ui/Textinput";
import InputGroup from "../ui/InputGroup";
// import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import Select from "../ui/Select";
import { useGetPatientDropdownQuery } from "@/src/store/api/patientApi";
import FormGroup from "../ui/FormGroup";
import { useCreateAntenatalMutation, useGetAntenatalAllQuery, useGetAntenatalQuery, useUpdateAntenatalMutation } from "@/src/store/api/antenatalApi";


const steps = [
   {
      id: 1,
      title: "Pemeriksaan",
   },
   {
      id: 2,
      title: "Pengukuran",
   },
   {
      id: 3,
      title: "Status Imunisasi",
   },
   {
      id: 4,
      title: "Laboratorium",
   },
];

// VALIDATION
const step1Validation = yup.object({
   idPatient: yup.string().trim().required("Pasien wajib diisi"),
   height: yup.number().required("Tinggi badan wajib diisi"),
   weight: yup.number().required("Berat badan wajib diisi"),
   bloodPressureSistole: yup.number().required("Tekanan Darah Sistole wajib diisi"),
   bloodPressureDiastole: yup.number().required("Tekanan Darah Diastole wajib diisi"),
}).required();

const step2Validation = yup.object({
   lila: yup.number().required("Pengukuran LILA wajib diisi"),
   gestationalAge: yup.number().required("Usia kehamilan wajib diisi"),
   measurementDjj: yup.number().required("Pengukuran DJJ wajib diisi"),
}).required();

const step3Validation = yup.object().shape({
   immunization: yup.array().min(1).of(yup.string().required()).required(),
});

const step4Validation = yup.object({
   bloodGroup: yup.string().trim().required("Golongan Darah wajib diisi"),
   bloodHb: yup.string().trim().required("HB wajib diisi"),
   testUrine: yup.string().trim().required("Test urine wajib diisi"),
   testPms: yup.array().min(1).of(yup.string().required()).required(),
}).required();

const AntenatalForm = ({ params }) => {
   const { isLoading, data: res } = useGetAntenatalQuery(params?.id, { skip: params?.id === undefined });
   const { isLoading: isLoadingPatient, data: resPatient } = useGetPatientDropdownQuery();
   const { refetch } = useGetAntenatalAllQuery();

   const [createAntenatal] = useCreateAntenatalMutation();
   const [updateAntenatal] = useUpdateAntenatalMutation();

   const [checkedImmunization, setCheckedImmunization] = useState([]);
   const [checkedTestPms, setCheckedTestPms] = useState([]);
   const [stepNumber, setStepNumber] = useState(0);

   const router = useRouter();
   const page = 'antenatal';
   const values = !isLoading && res?.data;

   // find current step schema
   let currentStepSchema;
   switch (stepNumber) {
      case 0:
         currentStepSchema = step1Validation;
         break;
      case 1:
         currentStepSchema = step2Validation;
         break;
      case 2:
         currentStepSchema = step3Validation;
         break;
      case 3:
         currentStepSchema = step4Validation;
         break;
   }

   // CHECKBOX OPTIONS
   const optionsImmunization = [
      {
         value: "t1",
         label: "T1",
      },
      {
         value: "t2",
         label: "T2",
      },
      {
         value: "t3",
         label: "T3",
      },
      {
         value: "t4",
         label: "T4",
      },
      {
         value: "t5",
         label: "T5",
      },
   ];

   const optionsTestPms = [
      {
         value: "hiv",
         label: "HIV",
      },
      {
         value: "sifilis",
         label: "SIFILIS",
      },
      {
         value: "normal",
         label: "Normal",
      },
   ];

   const optionsTestUrine = [
      {
         value: "protein",
         label: "Protein Urine",
      },
      {
         value: "protein_non",
         label: "Non Protein Urine",
      },
   ];


   // REACT FORM
   const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      reset,
   } = useForm({
      resolver: yupResolver(currentStepSchema),
      mode: "all",
      values
   });

   const onSubmit = (data) => {
      let totalSteps = steps.length;
      const isLastStep = stepNumber === totalSteps - 1;

      if (!isLastStep) {
         setStepNumber(stepNumber + 1);
      } else {

         const formData = {
            'uid': Date.now(),
            ...data
         };

         if (!isLoading && res?.data) {
            updateAntenatal({ id: res.data._id, payload: formData }).unwrap()
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
            createAntenatal({ id: data.idPatient, payload: formData }).unwrap()
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
                  console.log("🚀 ~ file: AntenatalForm.jsx:183 ~ .then ~ error:", error);
                  Swal.fire(
                     'Failed!',
                     error.data.message,
                     'error'
                  );
               });
         }
      }
   };

   const resetForm = () => {
      reset();
      setStepNumber(0);
      setCheckedImmunization([]);
      setCheckedTestPms([]);
      refetch();
   };

   const handlePrev = () => {
      setStepNumber(stepNumber - 1);
   };


   useEffect(() => {
   }, [stepNumber]);

   // Set value checkbox for pass to formData
   useEffect(() => {
      setValue("immunization", checkedImmunization);
      setValue("testPms", checkedTestPms);
   }, [setValue, checkedImmunization, checkedTestPms]);

   // Set value checkbox after response
   useEffect(() => {
      if (!isLoading && res?.data) {
         setCheckedImmunization(res.data.immunization);
         setCheckedTestPms(res.data.testPms);
      }
   }, [isLoading, res]);

   return (
      <div>
         <Card title={`${!isLoading && res ? 'Edit Form' : 'Tambah Form'} ${page}`} isBack={!isLoading && res ? true : false}>
            <div className="grid gap-5 grid-cols-12">
               <div className="lg:col-span-3 col-span-12">
                  <div className="flex z-[5] items-start relative flex-col lg:min-h-full md:min-h-[300px] min-h-[250px]">
                     {steps.map((item, i) => (
                        <div className="relative z-[1] flex-1 last:flex-none" key={i}>
                           <div className={`${stepNumber >= i
                              ? "bg-slate-900 text-white ring-slate-900 dark:bg-slate-900 dark:ring-slate-700  dark:ring-offset-slate-500 ring-offset-2"
                              : "bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 text-opacity-70 dark:bg-slate-700 dark:ring-slate-700"
                              } 
                                 transition duration-150 icon-box md:h-12 md:w-12 h-8 w-8 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium`}
                           >
                              {stepNumber <= i ? (
                                 <span> {i + 1}</span>
                              ) : (
                                 <span className="text-3xl">
                                    <Icons icon="bx:check-double" />
                                 </span>
                              )}
                           </div>

                           <div
                              className={` ${stepNumber >= i
                                 ? "bg-slate-900 dark:bg-slate-900"
                                 : "bg-[#E0EAFF] dark:bg-slate-600"
                                 } absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px]`}
                           ></div>
                           <div
                              className={` ${stepNumber >= i
                                 ? " text-slate-900 dark:text-slate-300"
                                 : "text-slate-500 dark:text-slate-300 dark:text-opacity-40"
                                 } absolute top-0 ltr:left-full rtl:right-full ltr:pl-4 rtl:pr-4 text-base leading-6 md:mt-3 mt-1 transition duration-150 w-full`}
                           >
                              <span className="w-max block">{item.title}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="conten-box lg:col-span-9 col-span-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                     {stepNumber === 0 && (
                        <div>
                           <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                              <Select
                                 name='idPatient'
                                 label="Pilih Pasien"
                                 className="capitalize"
                                 placeholder="-- Silahkan Pilih Pasien --"
                                 register={register}
                                 options={!isLoadingPatient && resPatient}
                                 error={errors.idPatient}
                                 defaultValue={''}
                              />
                              <InputGroup
                                 label="Tinggi Badan"
                                 type="number"
                                 append="cm"
                                 placeholder="Hasil Pemeriksaan Tinggi Badan"
                                 name="height"
                                 error={errors.height}
                                 register={register}
                              />
                              <InputGroup
                                 label="Berat Badan"
                                 type="number"
                                 append="kg"
                                 placeholder="Hasil Pemeriksaan Berat Badan"
                                 name="weight"
                                 error={errors.weight}
                                 register={register}
                              />
                              <Textinput
                                 label="Tekanan Darah Sistole"
                                 type="number"
                                 placeholder="Hasil Pemeriksaan Tekanan Darah"
                                 name="bloodPressureSistole"
                                 error={errors.bloodPressureSistole}
                                 register={register}
                              />
                              <Textinput
                                 label="Tekanan Darah Diastole"
                                 type="number"
                                 placeholder="Hasil Pemeriksaan Tekanan Darah"
                                 name="bloodPressureDiastole"
                                 error={errors.bloodPressureDiastole}
                                 register={register}
                              />
                           </div>
                        </div>
                     )}

                     {stepNumber === 1 && (
                        <div>
                           <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                              <InputGroup
                                 label="Ukur LILA (Lingkar Lengan Atas)"
                                 type="number"
                                 append="cm"
                                 placeholder="Hasil Pengukuran LILA"
                                 name="lila"
                                 error={errors.lila}
                                 register={register}
                              />
                              <InputGroup
                                 label="Usia Kehamilan"
                                 type="number"
                                 append="minggu"
                                 placeholder="Hasil Pengukuran Usia Kehamilan"
                                 name="gestationalAge"
                                 error={errors.gestationalAge}
                                 register={register}
                              />
                              <InputGroup
                                 label="Pengukuran DJJ (Denyut Jantung Janin)"
                                 type="number"
                                 append="/menit"
                                 placeholder="Hasil Pengukuran DJJ"
                                 name="measurementDjj"
                                 error={errors.measurementDjj}
                                 register={register}
                              />
                           </div>
                        </div>
                     )}
                     {stepNumber === 2 && (
                        <div>
                           <div className="grid grid-cols-1 gap-5">
                              <FormGroup
                                 label="Status Imunisasi TT"
                                 error={errors.immunization}
                                 errorToggle={checkedImmunization ? true : false}
                              >
                                 <div className="space-y-3">
                                    {optionsImmunization.map((option, i) => (
                                       <Checkbox
                                          key={i}
                                          name="immunization"
                                          label={option.label}
                                          value={checkedImmunization.includes(option.value)}
                                          // checked={!isLoading && res.data.immunization.includes(option.value)}
                                          onChange={() => {
                                             if (checkedImmunization.includes(option.value)) {
                                                setCheckedImmunization(checkedImmunization.filter((item) => item !== option.value));
                                             } else {
                                                setCheckedImmunization([...checkedImmunization, option.value]);
                                             }
                                          }}
                                       />
                                    ))}
                                    {checkedImmunization.length > 0 && (
                                       <div className="text-slate-900 dark:text-white">
                                          Dipilih : <span className="uppercase">{checkedImmunization.join(", ")}</span>
                                       </div>
                                    )}
                                 </div>
                              </FormGroup>
                           </div>
                        </div>
                     )}
                     {stepNumber === 3 && (
                        <div>
                           <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                              <Textinput
                                 label="Golongan Darah"
                                 type="text"
                                 placeholder="Hasil Pemeriksaan Lab Tekanan Darah"
                                 name="bloodGroup"
                                 error={errors.bloodGroup}
                                 register={register}
                              />
                              <Textinput
                                 label="HB"
                                 type="text"
                                 placeholder="Hasil Pemeriksaan Lab HB"
                                 name="bloodHb"
                                 error={errors.bloodHb}
                                 register={register}
                              />
                              <Select
                                 name='testUrine'
                                 label="Test Urine"
                                 className="capitalize"
                                 placeholder="-- Hasil Pemeriksaan Lab Tes Urine --"
                                 register={register}
                                 options={optionsTestUrine}
                                 error={errors.testUrine}
                                 defaultValue={''}
                              />
                              <FormGroup
                                 label="Test PMS"
                                 error={errors.testPms}
                                 errorToggle={checkedTestPms ? true : false}
                              >
                                 <div className="space-x-10 flex">
                                    {optionsTestPms.map((option, i) => (
                                       <Checkbox
                                          key={i}
                                          name="testPms"
                                          label={option.label}
                                          value={checkedTestPms.includes(option.value)}
                                          onChange={() => {
                                             if (checkedTestPms.includes(option.value)) {
                                                setCheckedTestPms(checkedTestPms.filter((item) => item !== option.value));
                                             } else {
                                                setCheckedTestPms([...checkedTestPms, option.value]);
                                             }
                                          }}
                                       />
                                    ))}
                                 </div>
                              </FormGroup>
                           </div>
                        </div>
                     )}


                     <div className={`${stepNumber > 0 ? "flex justify-between" : " text-right"} mt-20`}>
                        {stepNumber !== 0 && (
                           <button type="button" onClick={handlePrev} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                 {'< Sebelumnya'}
                              </span>
                           </button>
                        )}
                        <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                           <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                              {stepNumber !== steps.length - 1 ? "Selanjutnya >" : "submit ✔"}
                           </span>
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </Card>
      </div >
   );
};

export default AntenatalForm;
