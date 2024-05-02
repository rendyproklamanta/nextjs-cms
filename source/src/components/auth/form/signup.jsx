import React, { useState } from 'react';
import Textinput from '@/src/components/ui/Textinput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Checkbox from '@/src/components/ui/Checkbox';
import { useDispatch } from 'react-redux';
import { handleRegister } from '../../../store/slices/authSlice';

const schema = yup
   .object({
      name: yup.string().required('Name is Required'),
      email: yup.string().email('Invalid email').required('Email is Required'),
      password: yup
         .string()
         .min(6, 'Password must be at least 8 characters')
         .max(20, "Password shouldn't be more than 20 characters")
         .required('Please enter password'),
      // confirm password
      confirmpassword: yup
         .string()
         .oneOf([yup.ref('password'), null], 'Passwords must match'),
   })
   .required();

const RegForm = () => {
   const dispatch = useDispatch();

   const [checked, setChecked] = useState(false);
   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({
      resolver: yupResolver(schema),
      mode: 'all',
   });

   const router = useRouter();

   const onSubmit = (data) => {
      dispatch(handleRegister(data));
      setTimeout(() => {
         router.push('/dashboard');
      }, 1500);
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
         <Textinput
            name="name"
            label="name"
            type="text"
            placeholder=" Enter your name"
            register={register}
            error={errors.name}
         />{' '}
         <Textinput
            name="email"
            label="email"
            type="email"
            placeholder=" Enter your email"
            register={register}
            error={errors.email}
         />
         <Textinput
            name="password"
            label="passwrod"
            type="password"
            placeholder=" Enter your password"
            register={register}
            error={errors.password}
         />
         <Checkbox
            label="You accept our Terms and Conditions and Privacy Policy"
            value={checked}
            onChange={() => setChecked(!checked)}
         />
         <button className="btn btn-dark block w-full text-center">
            Create an account
         </button>
      </form>
   );
};

export default RegForm;
