'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Textinput from '@/src/components/ui/Textinput';
import Card from '@/src/components/ui/Card';
import {
   useCreateUserMutation,
   useGetUserQuery,
   useUpdateUserMutation,
} from '@/src/store/api/userApi';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const FormValidationSchema = yup
   .object({
      username: yup.string().trim().required('Username wajib diisi'),
      password: yup.string().trim().required('Password wajib diisi'),
      name: yup.string().trim().required('Nama Lengkap wajib diisi'),
      pmb: yup.string().trim().required('PMB wajib diisi'),
   })
   .required();

const UserForm = ({ params }) => {
   const {
      isLoading,
      data: res,
      refetch,
   } = useGetUserQuery(params?.id, { skip: params?.id === undefined });
   const [createUser, { isLoading: isLoadingCreateUser }] =
      useCreateUserMutation();
   const [updateUser, { isLoading: isLoadingUpdateUser }] =
      useUpdateUserMutation();

   const router = useRouter();
   const page = 'user';
   const values = !isLoading && res?.data;

   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({
      resolver: yupResolver(FormValidationSchema),
      mode: 'all',
      values,
   });

   const onSubmit = (data) => {
      const role = {
         role: 'user',
      };
      const formData = { ...data, ...role };

      console.log('🚀 ~ file: page.jsx:65 ~ onSubmit ~ post:', formData);

      if (!isLoading && res) {
         updateUser({ id: res.data._id, payload: formData })
            .unwrap()
            .then((res) => {
               if (res.success) {
                  Swal.fire('Success', `${page} Berhasil Diupdate`, 'success');
                  router.push(`/${page}/list`);
                  refetch();
               }
            });
      } else {
         createUser(formData)
            .unwrap()
            .then((res) => {
               if (res.success) {
                  Swal.fire(
                     'Success',
                     `${page} Berhasil Ditambahkan`,
                     'success',
                  );
                  router.push(`/${page}/list`);
               }
            });
      }
   };

   return (
      <Card
         title={`${!isLoading && res?.data ? `Edit ${page}` : `Tambah ${page}`}`}
      >
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
         >
            <div className="my-1">
               <Textinput
                  name="username"
                  label="username"
                  type="text"
                  placeholder="Masukkan username"
                  register={register}
                  error={errors.username}
               />
            </div>
            <div className="my-1">
               <Textinput
                  name="password"
                  label="password"
                  type="password"
                  placeholder="************"
                  register={register}
                  error={errors.password}
               />
            </div>
            <div className="my-1">
               <Textinput
                  name="name"
                  label="nama lengkap"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  register={register}
                  error={errors.name}
               />
            </div>
            <div className="my-1">
               <Textinput
                  name="pmb"
                  label="PMB"
                  type="text"
                  placeholder="Nama Praktek Mandiri Bidan (PMB)"
                  register={register}
                  error={errors.pmb}
               />
            </div>
            <div className="col-span-1 flex justify-between pt-3 text-center lg:col-span-2">
               <button
                  type="button"
                  className="btn-secondary h-10 cursor-pointer rounded-lg px-4 text-sm"
                  onClick={() => router.back()}
               >
                  {'< Kembali'}
               </button>
               {isLoadingCreateUser || isLoadingUpdateUser ? (
                  <div className="btn-dark block h-10 text-center text-sm">
                     <div
                        className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                     ></div>
                  </div>
               ) : (
                  <button
                     type="submit"
                     className="btn-dark h-10 rounded-lg px-4 text-sm"
                  >
                     Simpan Data
                  </button>
               )}
            </div>
         </form>
      </Card>
   );
};

export default UserForm;
