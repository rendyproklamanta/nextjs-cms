import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/src/components/ui/Icon';
import useMobileMenu from '@/src/hooks/useMobileMenu';
import Submenu from './Submenu';

const Navmenu = ({ menus }) => {
   const router = useRouter();
   const [activeSubmenu, setActiveSubmenu] = useState(null);

   const toggleSubmenu = (i) => {
      if (activeSubmenu === i) {
         setActiveSubmenu(null);
      } else {
         setActiveSubmenu(i);
      }
   };

   const location = usePathname();
   const locationName = location.replace('/', '');

   const [mobileMenu, setMobileMenu] = useMobileMenu();

   useEffect(() => {
      let submenuIndex = null;
      menus.map((item, i) => {
         if (!item.child) return;
         if (item.link === locationName) {
            submenuIndex = null;
         } else {
            const ciIndex = item.child.findIndex((ci) => ci.childlink === locationName);
            if (ciIndex !== -1) {
               submenuIndex = i;
            }
         }
      });

      setActiveSubmenu(submenuIndex);
      if (mobileMenu) {
         setMobileMenu(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [router, location]);

   return (
      <>
         <ul>
            {menus.map((item, i) => (
               <li
                  key={i}
                  className={` single-sidebar-menu 
              ${item.child ? 'item-has-children' : ''}
              ${activeSubmenu === i ? 'open' : ''}
              ${locationName === item.link ? 'menu-item-active' : ''}`}
               >
                  {/* single menu with no childred*/}
                  {!item.child && !item.isHeadr && (
                     <Link className="menu-link" href={'/' + item.link}>
                        <span className="menu-icon flex-grow-0">
                           <Icon icon={item.icon} />
                        </span>
                        <div className="text-box flex-grow">{item.title}</div>
                        {item.badge && <span className="menu-badge">{item.badge}</span>}
                     </Link>
                  )}
                  {/* only for menulabel */}
                  {item.isHeadr && !item.child && <div className="menulabel">{item.title}</div>}
                  {/*    !!sub menu parent   */}
                  {item.child && (
                     <div
                        className={`menu-link ${
                           activeSubmenu === i ? 'parent_active not-collapsed' : 'collapsed'
                        }`}
                        onClick={() => toggleSubmenu(i)}
                     >
                        <div className="flex flex-1 items-start">
                           <span className="menu-icon">
                              <Icon icon={item.icon} />
                           </span>
                           <div className="text-box">{item.title}</div>
                        </div>
                        <div className="flex-0">
                           <div
                              className={`menu-arrow transform transition-all duration-300 ${
                                 activeSubmenu === i ? ' rotate-90' : ''
                              }`}
                           >
                              <Icon icon="heroicons-outline:chevron-right" />
                           </div>
                        </div>
                     </div>
                  )}

                  <Submenu
                     activeSubmenu={activeSubmenu}
                     item={item}
                     i={i}
                     locationName={locationName}
                  />
               </li>
            ))}
         </ul>
      </>
   );
};

export default Navmenu;
