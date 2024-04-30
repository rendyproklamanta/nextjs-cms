import React from 'react';
import { Box, Button, MenuItem } from '@mui/material';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { download, generateCsv } from 'export-to-csv';

const MuiTable = ({
   columns,
   data,
   isFetching,
   pagination,
   setPagination,
   totalRow,
   handleExportData,
   csvConfig,
   columnFilters,
   setColumnFilters,
}) => {
   const handleExportRows = (rows) => {
      const rowData = rows.map((row) => row.original);
      const csv = generateCsv(csvConfig)(rowData);
      download(csvConfig)(csv);
   };

   const table = useMaterialReactTable({
      columns,
      data,
      enableRowSelection: true,
      enableColumnActions: false,
      enableRowActions: true,
      enableGlobalFilter: false,
      manualFiltering: true, //turn off client-side filtering
      manualPagination: true,
      positionActionsColumn: 'last',
      onColumnFiltersChange: setColumnFilters,
      state: {
         isLoading: isFetching, //cell skeletons and loading overlay
         pagination,
         columnFilters,
      },
      renderRowActionMenuItems: ({ row }) => [
         <MenuItem key="edit" onClick={() => console.info(row.original.id)}>
            Edit
         </MenuItem>,
         <MenuItem key="delete" onClick={() => console.info(row.original.id)}>
            Delete
         </MenuItem>,
      ],
      initialState: {
         density: 'compact',
         showColumnFilters: true,
      },
      rowCount: totalRow,
      onPaginationChange: setPagination,
      memoMode: 'cells',
      // columnFilterDisplayMode: 'popover',
      positionToolbarAlertBanner: 'bottom',
      paginationDisplayMode: 'pages',
      renderTopToolbarCustomActions: ({ table }) => (
         <Box
            sx={{
               display: 'flex',
               gap: '16px',
               padding: '8px',
               flexWrap: 'wrap',
            }}
         >
            <Button
               style={{ textTransform: 'none' }}
               onClick={handleExportData}
               startIcon={<FileDownloadIcon />}
            >
               Export All Data
            </Button>
            <Button
               style={{ textTransform: 'none' }}
               disabled={table.getRowModel().rows.length === 0}
               onClick={() => handleExportRows(table.getRowModel().rows)}
               startIcon={<FileDownloadIcon />}
            >
               Export Page Rows
            </Button>
            <Button
               style={{ textTransform: 'none' }}
               disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
               onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
               startIcon={<FileDownloadIcon />}
            >
               Export Selected Rows
            </Button>
         </Box>
      ),
   });

   return <MaterialReactTable table={table} />;
};

export default MuiTable;
