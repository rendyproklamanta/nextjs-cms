import { useSelector, useDispatch } from 'react-redux';
import { handleType } from '@/src/store/slices/layoutSlice';

const useMenuLayout = () => {
   const dispatch = useDispatch();
   const menuType = useSelector((state) => state.layout.type);

   const setMenuLayout = (value) => {
      dispatch(handleType(value));
   };

   return [menuType, setMenuLayout];
};

export default useMenuLayout;
