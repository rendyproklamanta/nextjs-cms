'use client';

// IMPORTS
import { createMRTColumnHelper } from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import {
   useGetDummyDataAllMutation,
   useGetDummyDataFilterMutation,
   useGetDummyDataTableQuery,
} from '@/src/store/api/userApi';
import { useEffect, useState } from 'react';
import MuiTable from '../ui/MuiTable';
import useDarkmode from '@/src/hooks/useDarkMode';

const csvConfig = mkConfig({
   fieldSeparator: ',',
   decimalSeparator: '.',
   useKeysAsHeaders: true,
});

const UserTable = () => {
   const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10, //customize the default page size
   });
   const page = pagination.pageIndex;
   const pageSize = pagination.pageSize;
   const [isDark] = useDarkmode();

   // STATE
   const [columnFilters, setColumnFilters] = useState([]);
   const [data, setData] = useState([]);
   const [totalRow, setTotalRow] = useState('');

   // Handling API
   const { isFetching, data: dataDummy } = useGetDummyDataTableQuery({
      page,
      pageSize,
   });
   const [handleExportData, { isLoading: isLoadingExport, data: dataExport }] =
      useGetDummyDataAllMutation();
   const [handleFilterData] = useGetDummyDataFilterMutation();

   // Format the Data as we like to show in table
   const dataFormat = (item) => {
      return {
         id: item.id,
         firstName: item.firstName,
         lastName: item.lastName,
         company: item.company,
         city: item.city,
         country: item.country,
      };
   };

   const filter = [...columnFilters];
   const payload = { page, pageSize, filter };

   useEffect(() => {
      if (columnFilters.length) {
         handleFilterData(payload)
            .unwrap()
            .then((res) => {
               setData(res?.data);
               setTotalRow(res?.totalRow);
            })
            .catch((error) => {
               console.log(
                  '🚀 ~ file: ReportDailyTable.jsx:37 ~ .then ~ error:',
                  error,
               );
            });
      } else {
         // Set Data
         if (!isFetching && dataDummy?.data) {
            setData(dataDummy?.data);
            setTotalRow(dataDummy?.totalRow);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [columnFilters, handleFilterData, dataDummy, isFetching]);

   // Handle export all data
   useEffect(() => {
      if (!isLoadingExport && dataExport?.data) {
         const data = dataExport?.data?.map((item) => dataFormat(item));

         const csv = generateCsv(csvConfig)(data);
         download(csvConfig)(csv);
      }
   }, [isLoadingExport, dataExport?.data]);

   // Set data
   let dataTable = [];
   let formattedNumber = 0;
   if (data) {
      dataTable = data?.map((item) => dataFormat(item));
      formattedNumber = totalRow
         ? totalRow.toLocaleString('id-ID').replace(/,/g, '.')
         : 0;
   }

   // Set Coloumn
   const columnHelper = createMRTColumnHelper();
   const columns = [
      columnHelper.accessor('id', {
         header: 'ID',
         size: 100,
         footer: 'Total Row',
      }),
      columnHelper.accessor('firstName', {
         header: 'First Name',
         size: 100,
         Cell: ({ renderedCellValue }) => (
            <span style={{ color: 'red' }}>{renderedCellValue}</span>
         ),
         Footer: () => <span color="warning.main">{formattedNumber}</span>,
      }),
      columnHelper.accessor('lastName', {
         header: 'Last Name',
         size: 100,
      }),
      columnHelper.accessor('company', {
         header: 'Company',
         size: 100,
      }),
      columnHelper.accessor('city', {
         header: 'City',
         size: 100,
      }),
      columnHelper.accessor('country', {
         header: 'Country',
         size: 100,
      }),
   ];

   return (
      <MuiTable
         columns={columns}
         data={dataTable}
         isFetching={isFetching}
         pagination={pagination}
         setPagination={setPagination}
         totalRow={totalRow}
         handleExportData={handleExportData}
         csvConfig={csvConfig}
         columnFilters={columnFilters}
         setColumnFilters={setColumnFilters}
         isDark={isDark}
      />
   );
};

export default UserTable;
