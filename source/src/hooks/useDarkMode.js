import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleDarkMode } from '@/src/store/slices/layoutSlice';

const useDarkmode = () => {
   const dispatch = useDispatch();
   const isDark = useSelector((state) => state.layout.darkMode);

   const setDarkMode = (mode) => {
      dispatch(handleDarkMode(mode));
      localStorage.setItem('darkMode', JSON.stringify(mode));
   };

   useEffect(() => {
      const storedDarkMode = localStorage.getItem('darkMode');
      if (storedDarkMode !== null) {
         dispatch(handleDarkMode(JSON.parse(storedDarkMode)));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return [isDark, setDarkMode];
};

export default useDarkmode;
