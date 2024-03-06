export const menuItems = [
   {
      title: "Beranda",
      isHide: true,
      icon: "heroicons:home",
      link: "",
   },
   {
      title: "Pasien",
      icon: "heroicons:face-smile",
      link: "#",
      isHide: true,
      child: [
         {
            childtitle: "Tambah Pasien",
            childlink: "patient",
         },
         {
            childtitle: "List Pasien",
            childlink: "patient/list",
         },
      ],
   },
   {
      title: "User",
      icon: "heroicons:user-group",
      link: "#",
      isHide: true,
      child: [
         {
            childtitle: "Tambah User",
            childlink: "user",
         },
         {
            childtitle: "List User",
            childlink: "user/list",
         },
      ],
   },
   {
      title: "Diagnosa",
      icon: "heroicons:beaker",
      link: "#",
      isHide: true,
      child: [
         {
            childtitle: "Tambah Diagnosa",
            childlink: "diagnosis",
         },
         {
            childtitle: "List Diagnosa",
            childlink: "diagnosis/list",
         },
      ],
   },
   {
      title: "PMB",
      icon: "heroicons:briefcase",
      link: "#",
      isHide: true,
      child: [
         {
            childtitle: "Tambah PMB",
            childlink: "pmb",
         },
         {
            childtitle: "List PMB",
            childlink: "pmb/list",
         },
      ],
   },
   {
      title: "Laporan",
      icon: "heroicons:clipboard-document-list",
      link: "#",
      isHide: true,
      child: [
         {
            childtitle: "Rekam Medis",
            childlink: "report/medical",
         },
         {
            childtitle: "Laporan Harian",
            childlink: "report/daily",
         },
         {
            childtitle: "Laporan Bulanan",
            childlink: "report/monthly",
         },
      ],
   },
   {
      title: "Pemeriksaan Antenatal",
      isHide: true,
      icon: "heroicons:chart-bar-square",
      link: "antenatal", // coming-soon
   },
   {
      title: "Deteksi Dini Preeklampsia",
      isHide: true,
      icon: "heroicons:signal",
      link: "preeklampsia", // coming-soon
   },
];

export default menuItems;
