import React from 'react';
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import Card from '@/src/components/ui/Card';
import GlobalFilter from '@/src/components/GlobalFilter';
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
         hooks.visibleColumns.push((columns) => [...columns]);
      },
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
            <div className="mb-6 items-center justify-between md:flex">
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
               <h4 className="card-title mb-3 md:mb-0">{title}</h4>
               <div>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
               </div>
            </div>
            {data == '' ? (
               <div className="flex flex-col items-center px-6">
                  <Image src="/assets/images/no-data.png" alt="" width={200} height={0} />
                  <h6 className="mt-3 text-secondary-400">Data not found</h6>
               </div>
            ) : (
               <>
                  <div className="-mx-6 overflow-x-auto">
                     <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                           <table
                              className="min-w-full table-fixed divide-y divide-slate-100 dark:divide-slate-700"
                              {...getTableProps}
                           >
                              <thead className=" border-t border-slate-100 dark:border-slate-800">
                                 {headerGroups.map((headerGroup, key) => (
                                    <tr key={key}>
                                       {headerGroup.headers.map((column, index) => (
                                          <th
                                             key={index}
                                             {...column.getSortByToggleProps()}
                                             scope="col"
                                             className="table-th"
                                          >
                                             {column.render('header')}
                                             <span>
                                                {column.isSorted
                                                   ? column.isSortedDesc
                                                      ? ' 🔽'
                                                      : ' 🔼'
                                                   : ''}
                                             </span>
                                          </th>
                                       ))}
                                    </tr>
                                 ))}
                              </thead>
                              <tbody
                                 className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-slate-800"
                                 {...getTableBodyProps}
                              >
                                 {page.map((row) => {
                                    prepareRow(row);
                                    const { key, ...restRowProps } = row.getRowProps();
                                    return (
                                       <tr key={key} {...restRowProps}>
                                          {row.cells.map((cell) => {
                                             const { key, ...restCellProps } = cell.getCellProps();
                                             return (
                                                <td
                                                   key={key}
                                                   {...restCellProps}
                                                   className="table-td"
                                                >
                                                   {cell.render('Cell')}
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
                  <div className="mt-6 items-center justify-between space-y-5 md:flex md:space-y-0">
                     <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                           className="form-control w-max py-2"
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
                           Page{' '}
                           <span>
                              {pageIndex + 1} of {pageOptions.length}
                           </span>
                        </span>
                     </div>
                     <ul className="flex flex-wrap  items-center  space-x-3 rtl:space-x-reverse">
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                           <button
                              className={` ${!canPreviousPage ? 'cursor-not-allowed opacity-50' : ''}`}
                              onClick={() => gotoPage(0)}
                              disabled={!canPreviousPage}
                           >
                              <Icon icon="heroicons:chevron-double-left-solid" />
                           </button>
                        </li>
                        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                           <button
                              className={` ${!canPreviousPage ? 'cursor-not-allowed opacity-50' : ''}`}
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
                                 className={` ${
                                    pageIdx === pageIndex
                                       ? 'bg-slate-900 font-medium  text-white dark:bg-slate-600 dark:text-slate-200 '
                                       : 'bg-slate-100 font-normal text-slate-900 dark:bg-slate-700  dark:text-slate-400  '
                                 }    flex h-6 w-6 items-center justify-center rounded text-sm leading-[16px] transition-all duration-150`}
                                 onClick={() => gotoPage(pageIdx)}
                              >
                                 {page + 1}
                              </button>
                           </li>
                        ))}
                        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                           <button
                              className={` ${!canNextPage ? 'cursor-not-allowed opacity-50' : ''}`}
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
                              className={` ${!canNextPage ? 'cursor-not-allowed opacity-50' : ''}`}
                           >
                              <Icon icon="heroicons:chevron-double-right-solid" />
                           </button>
                        </li>
                     </ul>
                  </div>
               </>
            )}
            {/*end*/}
         </Card>
      </>
   );
};

export default TableData;
