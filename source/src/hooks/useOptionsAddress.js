import { useState } from 'react';
import { toast } from 'react-toastify';

const useOptionsAddress = () => {
   const [optionsProvince, setOptionsProvince] = useState('');
   const [optionsRegency, setOptionsRegency] = useState('');
   const [optionsSubdistrict, setOptionsSubdistrict] = useState('');

   const getOptionsProvince = async () => {
      try {
         const response = await fetch("https://ibnux.github.io/data-indonesia/provinsi.json");
         const options = await response.json();
         setOptionsProvince(
            options.map(({ id, nama, }) => ({
               value: id,
               label: nama,
            }))
         );
      } catch (error) {
         console.log("🚀 ~ file: page.jsx:61 ~ getOptions ~ error:", error);
      }
      return optionsProvince;
   };

   const handleProvince = async (e) => {
      setOptionsSubdistrict("");
      try {
         const response = await fetch(`https://ibnux.github.io/data-indonesia/kabupaten/${e.target.value}.json`);
         const options = await response.json();
         setOptionsRegency(
            options.map(({ id, nama, }) => ({
               value: id,
               label: nama,
            }))
         );
         toast.success("Silahkan pilih Kabupaten", {
            position: "top-center",
            autoClose: 1000,
         });
      } catch (error) {
         console.log("🚀 ~ file: page.jsx:83 ~ handleProvince ~ error:", error);
      }
      return optionsRegency;
   };

   const handleRegency = async (e) => {
      try {
         const response = await fetch(`https://ibnux.github.io/data-indonesia/kecamatan/${e.target.value}.json`);
         const options = await response.json();
         setOptionsSubdistrict(
            options.map(({ id, nama, }) => ({
               value: id,
               label: nama,
            }))
         );
         toast.success("Silahkan pilih Kecamatan", {
            position: "top-center",
            autoClose: 1000,
         });
      } catch (error) {
         console.log("🚀 ~ file: page.jsx:83 ~ handleRegency ~ error:", error);
      }
      return optionsSubdistrict;
   };

   return [getOptionsProvince, handleProvince, handleRegency];
};

export default useOptionsAddress;