'use server';

import { cookies } from "next/headers";

export const setCookie = async (name, value, maxAge) => {
   cookies().set({
      name: name,
      value: value,
      httpOnly: true,
      path: '/',
      maxAge: maxAge,
   });

};

export const getCookie = (name) => {
   const res = cookies().get(name);
   return res;
};

export const deleteCookie = (name) => {
   cookies().delete(name);
};

