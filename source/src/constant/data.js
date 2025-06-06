export const colors = {
   primary: '#4669FA',
   secondary: '#A0AEC0',
   danger: '#F1595C',
   black: '#111112',
   warning: '#FA916B',
   info: '#0CE7FA',
   light: '#425466',
   success: '#50C793',
   'gray-f7': '#F7F8FC',
   dark: '#1E293B',
   'dark-gray': '#0F172A',
   gray: '#68768A',
   gray2: '#EEF1F9',
   'dark-light': '#CBD5E1',
};

export const hexToRGB = (hex, alpha) => {
   let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

   if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
   } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
   }
};
