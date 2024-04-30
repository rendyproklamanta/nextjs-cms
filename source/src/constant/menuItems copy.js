export const menuItems = [
   {
      title: 'Beranda',
      isHide: true,
      icon: 'heroicons:home',
      link: '',
   },
   {
      title: 'Staff',
      icon: 'heroicons:user-group',
      link: '#',
      isHide: true,
      child: [
         {
            childtitle: 'Tambah Staff',
            childlink: 'user',
         },
         {
            childtitle: 'List Staff',
            childlink: 'user/list',
         },
      ],
   },
   {
      title: 'Customer',
      icon: 'heroicons:user-group',
      link: '#',
      isHide: true,
      child: [
         {
            childtitle: 'Tambah User',
            childlink: 'user',
         },
         {
            childtitle: 'List User',
            childlink: 'user/list',
         },
      ],
   },
   {
      title: 'Pengiriman',
      icon: 'heroicons:truck',
      link: '#',
      isHide: true,
      child: [
         {
            childtitle: 'Tambah Pengiriman',
            childlink: 'user',
         },
         {
            childtitle: 'Riwayat Pengiriman',
            childlink: 'user/list',
         },
      ],
   },
   {
      title: 'Laporan',
      icon: 'heroicons:clipboard-document-list',
      link: '#',
      isHide: true,
      child: [
         {
            childtitle: 'Rekam Medis',
            childlink: 'report/medical',
         },
         {
            childtitle: 'Laporan Harian',
            childlink: 'report/daily',
         },
         {
            childtitle: 'Laporan Bulanan',
            childlink: 'report/monthly',
         },
      ],
   },
];

export default menuItems;
