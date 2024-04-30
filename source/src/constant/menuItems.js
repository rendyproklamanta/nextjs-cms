export const menuItems = [
   {
      title: 'Beranda',
      isHide: true,
      icon: 'heroicons:home',
      link: '',
   },
   {
      title: 'User',
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
      title: 'Laporan',
      icon: 'heroicons:clipboard-document-list',
      link: '#',
      isHide: true,
      child: [
         {
            childtitle: 'Laporan Harian',
            childlink: 'report/daily',
         },
      ],
   },
];

export default menuItems;
