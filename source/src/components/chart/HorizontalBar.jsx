import { preeklamsiaVal } from "@/src/constant/preeklamsiaOptions";
import useDarkmode from "@/src/hooks/useDarkMode";
import { useGetPreeklampsiaChartBarQuery } from "@/src/store/api/preeklampsiaApi";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const HorizontalBar = ({ firstDate, lastDate }) => {
   const [isDark] = useDarkmode();
   const { data: dataChartBar } = useGetPreeklampsiaChartBarQuery({ firstDate, lastDate });

   // Calculate the criteria dynamically based on non-zero values in the result array
   const criteria = dataChartBar?.data?.reduce((criteriaArray, item) => {
      item.data.forEach((value, index) => {
         if (value !== 0) {
            criteriaArray[index] = 1; // You can set any value as the criteria for non-zero data
         }
      });
      return criteriaArray;
   }, []);

   // Filter xaxis and result based on the criteria
   const filteredMonth = dataChartBar?.months?.filter((_, index) => criteria[index] === 1);
   const filteredData = dataChartBar?.data?.map(item => ({
      name: preeklamsiaVal(item?.name)?.label,
      data: item?.data?.filter((_, index) => criteria[index] === 1)
   }));

   const months = filteredMonth?.map((data) => new Intl.DateTimeFormat('id-ID', { month: "short", year: 'numeric', }).format(new Date(data))) ?? [];
   const series = filteredData ?? []; // if no data set empty array

   const options = {
      chart: {
         toolbar: {
            show: false,
         },
      },
      plotOptions: {
         bar: {
            horizontal: false,
            endingShape: "rounded",
            columnWidth: "55%",

         },
      },
      dataLabels: {
         enabled: false,
      },
      stroke: {
         show: true,
         width: 10,
         colors: ["transparent"],
      },
      legend: {
         position: "bottom",
         labels: {
            colors: isDark ? "#CBD5E1" : "#475569",
         },
      },

      xaxis: {
         categories: months,
         labels: {
            style: {
               colors: isDark ? "#CBD5E1" : "#475569",
               fontFamily: "Inter",
            },

         },
         axisBorder: {
            show: false,
         },
         axisTicks: {
            show: false,
         },
      },
      yaxis: {
         labels: {
            style: {
               colors: isDark ? "#CBD5E1" : "#475569",
               fontFamily: "Inter",
            },
            formatter: function (val) {
               return val.toFixed(0);
            }
         },
      },
      fill: {
         opacity: 1,
      },

      grid: {
         show: true,
         borderColor: isDark ? "#334155" : "#e2e8f0",
         position: "back",
      },
     // colors: ["#4669FA", "#0CE7FA", "#FA916B"],
   };
   return (
      <div>
         {dataChartBar && (<Chart options={options} series={series} type="bar" height="350" width={"100%"} />)}
      </div>
   );
};

export default HorizontalBar;
