import React, { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/Icon';

const Pagination = ({
   totalPages,
   currentPage,
   handlePageChange,
   text,
   className = 'custom-class',
}) => {
   const [pages, setPages] = useState([]);
   // eslint-disable-next-line no-unused-vars
   const rangeStart = useEffect(() => {
      let pages = [];
      for (let i = 1; i <= totalPages; i++) {
         pages.push(i);
      }
      setPages(pages);
   }, [totalPages]);

   return (
      <div className={className}>
         <ul className="pagination">
            <li>
               {text ? (
                  <button
                     className=" prev-next-btn text-slate-600 dark:text-slate-300"
                     onClick={() => handlePageChange(currentPage - 1)}
                     disabled={currentPage === 1}
                  >
                     Previous
                  </button>
               ) : (
                  <button
                     className="prev-next-btn flex h-6 w-6 flex-col  items-center justify-center  text-xl leading-4 text-slate-900 dark:text-white "
                     onClick={() => handlePageChange(currentPage - 1)}
                     disabled={currentPage === 1}
                  >
                     <Icon icon="heroicons-outline:chevron-left" />
                  </button>
               )}
            </li>

            {pages.map((page) => (
               <li key={page}>
                  <button
                     className={`${page === currentPage ? 'active' : ''} page-link`}
                     onClick={() => handlePageChange(page)}
                     disabled={page === currentPage}
                  >
                     {page}
                  </button>
               </li>
            ))}

            <li>
               {text ? (
                  <button
                     onClick={() => handlePageChange(currentPage + 1)}
                     disabled={currentPage === totalPages}
                     className=" prev-next-btn text-slate-600 dark:text-slate-300"
                  >
                     Next
                  </button>
               ) : (
                  <button
                     className="prev-next-btn flex h-6 w-6  flex-col  items-center justify-center  text-xl leading-4 text-slate-900 dark:text-white"
                     onClick={() => handlePageChange(currentPage + 1)}
                     disabled={currentPage === totalPages}
                  >
                     <Icon icon="heroicons-outline:chevron-right" />
                  </button>
               )}
            </li>
         </ul>
      </div>
   );
};

export default Pagination;
