import { useSelector, useDispatch } from "react-redux";
import { handleRtl } from "@/src/store/slices/layoutSlice";

const useRtl = () => {
  const dispatch = useDispatch();
  const isRtl = useSelector((state) => state.layout.isRTL);

  const setRtl = (val) => dispatch(handleRtl(val));

  return [isRtl, setRtl];
};

export default useRtl;
