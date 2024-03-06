export const preeklampsiaResult = (res) => {
   if (res === 'danger') {
      return 'Pasien Resiko Tinggi';
   }
   if (res === 'medium') {
      return 'Pasien Resiko Sedang';
   }
   if (res === 'normal') {
      return 'Pasien Kondisi Normal';
   }
};