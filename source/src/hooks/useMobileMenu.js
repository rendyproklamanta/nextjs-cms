import { useSelector, useDispatch } from "react-redux";
import { handleMobileMenu } from "@/src/store/slices/layoutSlice";

const useMobileMenu = () => {
  const dispatch = useDispatch();
  const mobileMenu = useSelector((state) => state.layout.mobileMenu);

  // ** Toggles Mobile Menu
  const setMobileMenu = (val) => dispatch(handleMobileMenu(val));

  return [mobileMenu, setMobileMenu];
};

export default useMobileMenu;
