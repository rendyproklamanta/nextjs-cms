import React from 'react';
import useSkin from '@/src/hooks/useSkin';
import Button from './Button';
import { useRouter } from 'next/navigation';

const Card = ({
   children,
   title,
   isBack,
   subtitle,
   headerslot,
   className = 'custom-class  bg-white',
   bodyClass = 'p-6',
   noborder,
   bgColor,
   titleClass = 'custom-class ',
}) => {
   const [skin] = useSkin();
   const router = useRouter();

   return (
      <div
         className={`card rounded-md 
         ${skin === 'bordered' ? ' border border-slate-200 dark:border-slate-700' : 'shadow-base'}
         ${bgColor ? bgColor : 'bg-white dark:bg-slate-800'}
         ${className}`}
      >
         {(title || subtitle) && (
            <header className={`card-header ${noborder ? 'no-border' : ''}`}>
               <div>
                  {title && (
                     <div className={`card-title ${titleClass}`}>
                        <span className="flex items-center">
                           {isBack && (
                              <Button
                                 icon="heroicons-outline:chevron-left"
                                 text="Kembali"
                                 className="btn-secondary light btn-sm mr-4 rounded-lg"
                                 onClick={() => router.back()}
                              />
                           )}
                           {title}
                        </span>
                     </div>
                  )}
                  {subtitle && <div className="card-subtitle">{subtitle}</div>}
               </div>
               {headerslot && <div className="card-header-slot">{headerslot}</div>}
            </header>
         )}
         <main className={`card-body ${bodyClass}`}>{children}</main>
      </div>
   );
};

export default Card;
