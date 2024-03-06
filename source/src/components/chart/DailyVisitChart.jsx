import useDarkmode from "@/src/hooks/useDarkMode";
import { useGetAntenatalDailyVisitChartQuery } from "@/src/store/api/antenatalApi";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DailyVisitChart = ({ height = 350, firstDate, lastDate }) => {
   const [isDark] = useDarkmode();
   const { data: dataAntenatalDailyVisit } = useGetAntenatalDailyVisitChartQuery({ firstDate, lastDate });

   const series = [
      {
         name: "Total kunjungan",
         data: dataAntenatalDailyVisit?.data?.counts,
      },
   ];
   const options = {
      chart: {
         toolbar: {
            show: false,
         },
      },
      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: "smooth",
         width: 4,
      },
      colors: ["#4669FA"],
      tooltip: {
         theme: "dark",
      },
      grid: {
         show: true,
         borderColor: isDark ? "#334155" : "#e2e8f0",
         strokeDashArray: 10,
         position: "back",
      },
      fill: {
         type: "gradient",
         colors: "#4669FA",
         gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.5,
            stops: [50, 100, 0],
         },
      },
      yaxis: {
         labels: {
            style: {
               colors: isDark ? "#CBD5E1" : "#475569",
            },
            formatter: function (val) {
               return val.toFixed(0);
            }
         },
      },
      xaxis: {
         categories: dataAntenatalDailyVisit?.data?.months,
         labels: {
            style: {
               colors: isDark ? "#CBD5E1" : "#475569",
            },
         },
         axisBorder: {
            show: false,
         },
         axisTicks: {
            show: false,
         },
      },
      padding: {
         top: 0,
         right: 0,
         bottom: 0,
         left: 0,
      },
   };
   return (
      <>
         {dataAntenatalDailyVisit && (
            <Chart options={options} series={series} type="area" height={height} width={"100%"} />
         )}
      </>
   );
};

export default DailyVisitChart;
