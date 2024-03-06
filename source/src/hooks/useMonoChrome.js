import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleMonoChrome } from "@/src/store/slices/layoutSlice";

const useMonoChrome = () => {
   const dispatch = useDispatch();
   const isMonoChrome = useSelector((state) => state.layout.isMonochrome);

   const setMonoChrome = (val) => {
      dispatch(handleMonoChrome(val));
      localStorage.setItem("monochrome", JSON.stringify(val));
   };

   useEffect(() => {
      const storedMode = localStorage.getItem("monochrome");
      if (storedMode !== null) {
         dispatch(handleMonoChrome(JSON.parse(storedMode)));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return [isMonoChrome, setMonoChrome];
};

export default useMonoChrome;
