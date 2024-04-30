import React from 'react';
import { Image as NextImage } from 'next/image';

const Image = ({ wrapperClass = 'custom-class', src, className, alt = 'image-title' }) => {
   return (
      <div className={`relative ${wrapperClass}`}>
         {src ? (
            <NextImage
               width={500}
               height={0}
               src={src}
               alt={alt}
               className={`block max-w-full ${className}`}
            />
         ) : (
            <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-md bg-neutral-300 text-xl font-medium capitalize text-slate-900">
               Please Set Image
               <code className="mt-3 text-sm lowercase text-primary-500">
                  [src={`"images/all-img/image-1.png"`}]
               </code>
            </div>
         )}
      </div>
   );
};

export default Image;
