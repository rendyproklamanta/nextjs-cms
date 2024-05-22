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
   return name;
};

export const getCookie = (name) => {
   const res = cookies().get(name);
   return res?.value;
};

export const hasCookie = (name) => {
   const res = cookies().has(name);
   return res;

};

export const clearCookie = () => {
   cookies().getAll().forEach((cookie) => {
      cookies().delete(cookie.name);
   });
};

