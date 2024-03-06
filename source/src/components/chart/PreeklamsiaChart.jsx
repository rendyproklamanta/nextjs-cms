import { preeklamsiaVal } from "@/src/constant/preeklamsiaOptions";
import useDarkmode from "@/src/hooks/useDarkMode";
import { useGetPreeklampsiaChartQuery } from "@/src/store/api/preeklampsiaApi";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PreeklamsiaChart = () => {
   const [isDark] = useDarkmode();
   const { isLoading, data: res } = useGetPreeklampsiaChartQuery();

   let label = [];
   !isLoading && res?.data?.val.map((newVal) => {
      label.push(preeklamsiaVal(newVal).label);
   });

   const series = !isLoading && res.data.count;

   const options = {
      labels: !isLoading && label,
      dataLabels: {
         enabled: true,
      },

      colors: ["#4669FA", "#F1595C", "#50C793", "#0CE7FA", "#FA916B"],
      legend: {
         position: "right",
         fontSize: "16px",
         fontWeight: 400,
         labels: {
            colors: isDark ? "#CBD5E1" : "#475569",
         },
         markers: {
            width: 6,
            height: 6,
            offsetY: -1,
            offsetX: -5,
            radius: 12,
         },
         itemMargin: {
            horizontal: 10,
            vertical: 0,
         },
      },

      responsive: [
         {
            breakpoint: 480,
            options: {
               legend: {
                  position: "bottom",
               },
            },
         },
      ],
   };

   return (
      <div>
         {!isLoading && res.data.val && (
            <Chart options={options} series={series} type="pie" height="450" width={"100%"} />
         )}
      </div>
   );
};

export default PreeklamsiaChart;
