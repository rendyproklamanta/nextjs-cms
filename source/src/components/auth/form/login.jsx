'use client';

import React, { useState } from 'react';
import Textinput from '@/src/components/ui/Textinput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Checkbox from '@/src/components/ui/Checkbox';
import { useDispatch } from 'react-redux';
import { usePostUserLoginMutation } from '@/src/store/api/authApi';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { nextEncrypt } from '@/src/utils/encryption';
import { setCookie } from '@/src/utils/cookies';
// import Select from '../../ui/Select';

const schema = yup
   .object()
   .shape({
      username: yup.string().required('Username is Required'),
      password: yup.string().required('Password is Required'),
   })
   .required();

const LoginForm = () => {
   const [checkedRemember, setCheckedRemember] = useState(false);
   const [userLogin, { error: errorPostLogin, isLoading }] =
      usePostUserLoginMutation();
   // eslint-disable-next-line no-unused-vars
   const dispatch = useDispatch();
   useEffect(() => {
      if (errorPostLogin) {
         Swal.fire(
            'Failed!',
            errorPostLogin?.error
               ? errorPostLogin?.originalStatus + ' - ' + errorPostLogin?.error
               : errorPostLogin?.data?.message,
            'error',
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
      mode: 'all',
   });

   const onSubmit = (data) => {
      const additionals = {
         rememberMe: checkedRemember,
      };
      const formData = { ...data, ...additionals };

      userLogin(formData)
         .unwrap()
         .then(async (res) => {
            if (res?.success) {
               // const result = JSON.stringify(res.data);
               // dispatch(loginSlice(res?.data));
               const encryptedAccessToken = await nextEncrypt(
                  res?.data?.accessToken,
               );
               await setCookie(
                  'accessToken',
                  encryptedAccessToken,
                  res.data.accessTokenExpiry,
               );
               await setCookie(
                  'refreshToken',
                  res?.data?.refreshToken,
                  res.data.refreshTokenExpiry,
               );
            } else {
               Swal.fire('Failed!', res?.message, 'error');
            }
         });
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="animate__animated animate__zoomIn space-y-6"
      >
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
               value={checkedRemember}
               onChange={() => setCheckedRemember(!checkedRemember)}
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
            <button
               type="button"
               className="btn btn-dark block w-full text-center"
            >
               <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
               ></div>
            </button>
         ) : (
            <button
               type="submit"
               className="btn btn-dark block w-full text-center"
            >
               Sign in
            </button>
         )}
      </form>
   );
};

export default LoginForm;
