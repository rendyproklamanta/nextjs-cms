import NextCrypto from "next-crypto";

const crypto = new NextCrypto(process.env.NEXT_PUBLIC_SECRET_ACCESS_TOKEN);

export const nextEncrypt = async (payload) => {
   const encrypted = await crypto.encrypt(payload);

   return encrypted;
};

export const nextDecrypt = async (payload) => {
   const decrypted = await crypto.decrypt(payload);

   return decrypted;
};
