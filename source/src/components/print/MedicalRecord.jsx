'use client';

import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import { preeklampsiaResult } from '@/src/configs/constants';

const MedicalRecord = ({ data, pmb, antenatal, preeklampsia }) => {
   const province = data?.province?.split(',');
   const regency = data?.regency?.split(',');
   const subdistrict = data?.subdistrict?.split(',');

   const dataProvince = data?.province && province[1];
   const dataRegency = data?.regency && regency[1];
   const dataSubdistrict = data?.subdistrict && subdistrict[1];

   return (
      <div className="mx-auto max-w-[800px] capitalize">
         <div className="mb-5 text-center text-xl font-normal text-black-600 dark:text-slate-300 md:text-2xl">
            <Image
               src="/assets/images/logo/logo.png"
               className="mx-auto mb-5 text-center"
               alt=""
               width={150}
               height={0}
               priority={true}
            />
            e-Rekam Medis Sistem Informasi Ibu Hamil Deteksi Dini
            <br />
            Kejadian Preeklamsia Kabupaten Bangkalan
         </div>
         <div className="mb-5 border-b-4 border-black-500 dark:border-white"></div>

         <div className="text-black mx-auto max-w-[600px]">
            <div className="px-2">
               <div className="flex">
                  <p className="w-[200px]">Nama PMB</p>
                  <p>: {pmb?.namePmb}</p>
               </div>
               <div className="flex">
                  <p className="w-[200px]">Nama Bidan</p>
                  <p>: {pmb?.nameMidwife}</p>
               </div>
               <div className="flex">
                  <p className="w-[200px]">Tanggal pemeriksaan</p>
                  <p>
                     :{' '}
                     {moment(data && data?.medical[0]?.createdAt).format('dddd, DD-MM-YYYY HH:mm') +
                        ' WIB'}
                  </p>
               </div>
            </div>

            <div className="mt-5 border-2 border-black-800 px-2 py-2">
               <div className="">
                  <div className="flex">
                     <p className="w-[200px] font-bold">IDENTITAS PASIEN</p>
                     <p></p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">No RM</p>
                     <p>: {data?.norm}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Nama</p>
                     <p>: {data?.name}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Tempat Lahir</p>
                     <p>: {data?.pob}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Tanggal Lahir</p>
                     <p>: {moment(data?.dob).format('DD-MM-YYYY')}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Jenis Kelamin</p>
                     <p>: {data?.gender}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Pekerjaan</p>
                     <p>: {data?.job}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Pendidikan</p>
                     <p>: {data?.education}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Alamat</p>
                     <p>: {data?.address}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Provinsi</p>
                     <p>: {dataProvince}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Kabupaten/Kota</p>
                     <p>: {dataRegency}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Kecamatan</p>
                     <p>: {dataSubdistrict}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">RT</p>
                     <p>: {data?.rt}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">RW</p>
                     <p>: {data?.rw}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Nama Ayah/Suami</p>
                     <p>: {data?.father}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Kehamilan Ke</p>
                     <p>: {data?.pregnancy}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Riwayat Keguguran</p>
                     <p>: {data?.miscarriage}</p>
                  </div>
               </div>

               <div className="mt-5">
                  <div className="flex">
                     <p className="w-[200px] font-bold">PEMERIKSAAN ANTENATAL CARE</p>
                     <p></p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Berat Badan</p>
                     <p>: {antenatal?.weight}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Tinggi Badan</p>
                     <p>: {antenatal?.height}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Tekanan Darah</p>
                     <p>: {antenatal?.bloodPressure}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Ukur LILA (Lingkar Lengan Atas)</p>
                     <p>: {antenatal?.lila}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Pengukuran DJJ (Denyut Jantung Janin)</p>
                     <p>: {antenatal?.measurementDjj}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Usia Kehamilan</p>
                     <p>: {antenatal?.gestationalAge}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Status Imunisasi TT</p>
                     <p>: {antenatal?.immunization?.join(', ')}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Golongan Darah</p>
                     <p>: {antenatal?.bloodGroup}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">HB</p>
                     <p>: {antenatal?.bloodHb}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Test Urine</p>
                     <p>: {antenatal?.testUrine}</p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Test PMS</p>
                     <p>: {antenatal?.testPms}</p>
                  </div>
               </div>

               <div className="mt-5">
                  <div className="flex">
                     <p className="w-[200px] font-bold">PEMERIKSAAN DETEKSI DINI PREEKLAMSIA</p>
                     <p></p>
                  </div>
                  <div className="flex">
                     <p className="w-[200px]">Hasil Pemeriksaan</p>
                     <p>: {preeklampsiaResult(preeklampsia?.result)}</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
               <div></div>
               <div></div>
               <div className="mt-10 flex flex-col items-center">
                  <p>Mengetahui</p>
                  <p className="mt-20">Bidan Pemeriksa</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MedicalRecord;
