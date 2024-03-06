import React from "react";
import Link from "next/link";
import useDarkMode from "@/src/hooks/useDarkMode";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Image from "next/image";
const MobileLogo = () => {
   const [isDark] = useDarkMode();
   return (
      <Link href="/">
         <Image
            src={isDark ? LogoWhite : MainLogo}
            width={400}
            height={0}
            alt=""
         />
      </Link>
   );
};

export default MobileLogo;
