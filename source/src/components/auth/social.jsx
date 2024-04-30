import Image from 'next/image';

const Social = () => {
   return (
      <>
         <ul className="flex">
            <li className="flex-1">
               <a
                  href="#"
                  className="inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#1C9CEB] text-2xl text-white"
               >
                  <Image src={`/assets/images/icon/tw.svg`} alt="" width={400} height={0} />
               </a>
            </li>
            <li className="flex-1">
               <a
                  href="#"
                  className="inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#395599] text-2xl text-white"
               >
                  <Image src={`/assets/images/icon/fb.svg`} alt="" width={400} height={0} />
               </a>
            </li>
            <li className="flex-1">
               <a
                  href="#"
                  className="inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#0A63BC] text-2xl text-white"
               >
                  <Image src={`/assets/images/icon/in.svg`} alt="" width={400} height={0} />
               </a>
            </li>
            <li className="flex-1">
               <a
                  href="#"
                  className="inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#EA4335] text-2xl text-white"
               >
                  <Image src={`/assets/images/icon/gp.svg`} alt="" width={400} height={0} />
               </a>
            </li>
         </ul>
      </>
   );
};

export default Social;
