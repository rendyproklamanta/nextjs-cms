import { useSelector, useDispatch } from 'react-redux';
import { handleSidebarCollapsed } from '@/src/store/slices/layoutSlice';

const useSidebar = () => {
   const dispatch = useDispatch();
   const collapsed = useSelector((state) => state.layout.isCollapsed);

   // ** Toggles Menu Collapsed
   const setMenuCollapsed = (val) => dispatch(handleSidebarCollapsed(val));

   return [collapsed, setMenuCollapsed];
};

export default useSidebar;
