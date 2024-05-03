export const menuItems = [
   {
      title: 'Beranda',
      isHide: true,
      icon: 'heroicons:home',
      link: 'dashboard',
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
];

export default menuItems;
