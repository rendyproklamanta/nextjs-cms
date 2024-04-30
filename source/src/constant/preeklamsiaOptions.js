const val1 = {
   score: 101,
   value: 'val1',
   label: 'Multipara dengan kehamilan oleh pasangan baru',
};

const val2 = {
   score: 102,
   value: 'val2',
   label: 'Kehamilan dengan teknologi reproduksti terbantu: bayi tabung, obat induksi ovulasi',
};

const val3 = {
   score: 103,
   value: 'val3',
   label: 'Umur ≥ 35 Tahun',
};

const val4 = {
   score: 104,
   value: 'val4',
   label: 'Multipara yang jarak kehamilan sebelum nya > 10 tahun',
};

const val5 = {
   score: 105,
   value: 'val5',
   label: 'Riwayat PE pada ibu atau saudara perempuan',
};

const val6 = {
   score: 106,
   value: 'val6',
   label: 'Obsitas sebelum hamil (IMT > 30 kg/m2)',
};

const val7 = {
   score: 207,
   value: 'val7',
   label: 'Multipara dengan riwayat PE sebelumnya',
};

const val8 = {
   score: 208,
   value: 'val8',
   label: 'Kehamilan kembar',
};

const val9 = {
   score: 209,
   value: 'val9',
   label: 'Diabetes dalam kehamilan',
};

const val10 = {
   score: 210,
   value: 'val10',
   label: 'Hipertensi Kronik',
};

const val11 = {
   score: 211,
   value: 'val11',
   label: 'Penyakit ginjal',
};

const val12 = {
   score: 212,
   value: 'val12',
   label: 'Penyakit autoimun, SLE',
};

const val13 = {
   score: 213,
   value: 'val13',
   label: 'Anti Phospholid Syndrome* (APS)',
};

const val14 = {
   score: 114,
   value: 'val14',
   label: 'Mean Arterial Presure > 90 mmHg ** (MAP)',
};

const val15 = {
   score: 115,
   value: 'val15',
   label: 'Protein Urine (Adanya Protein dalam Urine)',
};

// CHECKBOX OPTIONS
export const optionspreeklampsia = [
   val1,
   val2,
   val3,
   val4,
   val5,
   val6,
   val7,
   val8,
   val9,
   val10,
   val11,
   val12,
   val13,
   val14,
   val15,
];

const preeklampsiaValue = {
   val1: val1,
   val2: val2,
   val3: val3,
   val4: val4,
   val5: val5,
   val6: val6,
   val7: val7,
   val8: val8,
   val9: val9,
   val10: val10,
   val11: val11,
   val12: val12,
   val13: val13,
   val14: val14,
   val15: val15,
};

export const preeklamsiaVal = (val) => {
   //return preeklampsiaValue[val].label;
   return preeklampsiaValue[val];
};
