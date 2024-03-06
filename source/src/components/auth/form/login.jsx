import React, { useState } from "react";
import Textinput from "@/src/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "@/src/components/ui/Checkbox";
import { useDispatch } from "react-redux";
import { loginSlice } from "../../../store/slices/authSlice";
import { usePostUserLoginMutation } from "@/src/store/api/authApi";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Select from "../../ui/Select";

const schema = yup.object().shape({
   role: yup.string().required("Role is Required"),
   username: yup.string().required("Username is Required"),
   password: yup.string().required("Password is Required"),
}).required();

const LoginForm = () => {
   const [userLogin, { error: errorPostLogin, isLoading }] = usePostUserLoginMutation();
   const dispatch = useDispatch();

   useEffect(() => {
      if (errorPostLogin) {
         Swal.fire(
            'Failed!',
            errorPostLogin.error ? errorPostLogin.error : errorPostLogin.data.message,
            'error'
         );
      }
   }, [errorPostLogin]);

   const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
   } = useForm({
      resolver: yupResolver(schema),
      //
      mode: "all",
   });

   const onSubmit = (data) => {
      userLogin(data).unwrap()
         .then((res) => {
            if (res?.success) {
               dispatch(loginSlice(res.data));
               Swal.fire(
                  'Success',
                  'Login successfully',
                  'success'
               );
            } else {
               Swal.fire(
                  'Failed!',
                  res?.message,
                  'error'
               );
            }
         });
   };

   const [checked, setChecked] = useState(false);

   const optionsRole = [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' },
   ];

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate__animated animate__zoomIn">
         <Select
            register={register}
            name='role'
            label="Role"
            options={optionsRole}
            defaultValue={''}
            error={errors?.role}
         />
         <Textinput
            name="username"
            label="username"
            type="text"
            placeholder="Masukkan username"
            register={register}
            error={errors?.username}
            onChange={(e) => {
               setValue('username', e.target.value);
             }}
         />
         <Textinput
            name="password"
            label="password"
            type="password"
            placeholder="Masukkan password"
            register={register}
            error={errors.password}
            onChange={(e) => {
               setValue('password', e.target.value);
             }}
         />
         <div className="flex justify-between">
            <Checkbox
               value={checked}
               onChange={() => setChecked(!checked)}
               label="Keep me signed in"
            />
            {/* <Link
               href="/forgot-password"
               className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
            >
               Forgot Password?{" "}
            </Link> */}
         </div>

         {isLoading ? (
            <div className="btn btn-dark block w-full text-center">
               <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
            </div>
         ) : (
            <button className="btn btn-dark block w-full text-center animate__animated animate__bounceIn animate__delay-2s">
               Sign in
            </button>
         )}


      </form>
   );
};

export default LoginForm;
