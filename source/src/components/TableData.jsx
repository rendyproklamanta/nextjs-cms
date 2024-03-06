import React from 'react';
import {
   useTable,
   useRowSelect,
   useSortBy,
   useGlobalFilter,
   usePagination,
} from "react-table";
import Card from "@/src/components/ui/Card";
import GlobalFilter from "@/src/components/GlobalFilter";
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Button from './ui/Button';
import { useRouter } from 'next/navigation';

const TableData = ({ title, columns, data, isBack }) => {
   const tableInstance = useTable(
      {
         columns,
         data,
      },

      useGlobalFilter,
      useSortBy,
      usePagination,
      useRowSelect,

      (hooks) => {
         hooks.visibleColumns.push((columns) => [
            ...columns,
         ]);
      }
   );

   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      // eslint-disable-next-line no-unused-vars
      footerGroups,
      page,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageOptions,
      state,
      gotoPage,
      pageCount,
      setPageSize,
      setGlobalFilter,
      prepareRow,
   } = tableInstance;

   const { globalFilter, pageIndex, pageSize } = state;

   const router = useRouter();

   return (
      <>
         <Card>
            <div className="md:flex justify-between items-center mb-6">
               {isBack && (
                  <span className="flex items-center">
                     <Button
                        icon="heroicons-outline:chevron-left"
                        text="Kembali"
                        className="btn-secondary light btn-sm mr-4 rounded-lg"
                        onClick={() => router.back()}
                     />
                  </span>
               )}
               <h4 className="card-title md:mb-0 mb-3">{title}</h4>
               <div>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
               </div>
            </div>
            {
               data == '' ?
                  (
                     <div className='px-6 flex flex-col items-center'>
                        <Image src="/assets/images/no-data.png" alt="" width={200} height={0} />
                        <h6 className='mt-3 text-secondary-400'>Data not found</h6>
                     </div>
                  ) :
                  (
                     <>
                        <div className="overflow-x-auto -mx-6">
                           <div className="inline-block min-w-full align-middle">
                              <div className="overflow-hidden ">
                                 <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700" {...getTableProps}>
                                    <thead className=" border-t border-slate-100 dark:border-slate-800">
                                       {headerGroups.map((headerGroup, key) => (
                                          <tr key={key}>
                                             {headerGroup.headers.map((column, index) => (
                                                <th key={index} {...column.getSortByToggleProps()}
                                                   scope="col"
                                                   className="table-th"
                                                >
                                                   {column.render("header")}
                                                   <span>
                                                      {column.isSorted ? column.isSortedDesc ? " 🔽" : " 🔼" : ""}
                                                   </span>
                                                </th>
                                             ))}
                                          </tr>
                                       ))}
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700" {...getTableBodyProps}>
                                       {page.map((row) => {
                                          prepareRow(row);
                                          const { key, ...restRowProps } = row.getRowProps();
                                          return (
                                             <tr key={key} {...restRowProps}>
                                                {row.cells.map((cell) => {
                                                   const { key, ...restCellProps } = cell.getCellProps();
                                                   return (
                                                      <td key={key} {...restCellProps} className="table-td">
                                                         {cell.render("Cell")}
                                                      </td>
                                                   );
                                                })}
                                             </tr>
                                          );
                                       })}
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                           <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                              <select
                                 className="form-control py-2 w-max"
                                 value={pageSize}
                                 onChange={(e) => setPageSize(Number(e.target.value))}
                              >
                                 {[10, 25, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                       Show {pageSize}
                                    </option>
                                 ))}
                              </select>
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                 Page{" "}
                                 <span>
                                    {pageIndex + 1} of {pageOptions.length}
                                 </span>
                              </span>
                           </div>
                           <ul className="flex items-center  space-x-3  rtl:space-x-reverse flex-wrap">
                              <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                                 <button
                                    className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => gotoPage(0)}
                                    disabled={!canPreviousPage}>
                                    <Icon icon="heroicons:chevron-double-left-solid" />
                                 </button>
                              </li>
                              <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                                 <button
                                    className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => previousPage()}
                                    disabled={!canPreviousPage}
                                 >
                                    Prev
                                 </button>
                              </li>
                              {pageOptions.map((page, pageIdx) => (
                                 <li key={pageIdx}>
                                    <button
                                       href="#"
                                       aria-current="page"
                                       className={` ${pageIdx === pageIndex
                                          ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                                          : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                                          }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                       onClick={() => gotoPage(pageIdx)}
                                    >
                                       {page + 1}
                                    </button>
                                 </li>
                              ))}
                              <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                                 <button
                                    className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                       }`}
                                    onClick={() => nextPage()}
                                    disabled={!canNextPage}
                                 >
                                    Next
                                 </button>
                              </li>
                              <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                                 <button
                                    onClick={() => gotoPage(pageCount - 1)}
                                    disabled={!canNextPage}
                                    className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}>
                                    <Icon icon="heroicons:chevron-double-right-solid" />
                                 </button>
                              </li>
                           </ul>
                        </div>
                     </>
                  )}
            {/*end*/}
         </Card >
      </>
   );
};

export default TableData;