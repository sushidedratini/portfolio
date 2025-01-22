import React, { useState } from 'react';
import { MenuItem } from '../commons/types';
import Image from 'next/image';

interface SubMenuProps {
  items: MenuItem[];
}

const SubMenu: React.FC<SubMenuProps> = ({ items }) => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleMouseEnter = (name: string) => {
    setOpenSubMenu(name);
  };

  const handleMouseLeave = () => {
    setOpenSubMenu(null);
  };

  return (
    <div className="absolute left-full top-0 border border-win98-dark-gray w-48 bg-win98-gray border-t-2 border-t-white border-b-2 border-b-black border-r-2 border-r-black border-solid text-black text-sm font-win98">
      <ul className="flex flex-col">
        {items.map((item, index) => (
          <li
            key={index}
            className="p-2 hover:bg-win98-dark-blue hover:text-white relative"
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              {item.icon && <Image src={item.icon} alt={item.name} />}
              <p>{item.name}</p>
            </div>
            {item.submenu.length > 0 && openSubMenu === item.name && (
              <SubMenu items={item.submenu} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubMenu;