import React, { useState } from 'react';
import { MenuItem } from '../commons/types';

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
    <div className="absolute left-full top-0 bg-win95-light-gray border border-win95-dark-gray w-48 text-black text-sm">
      <ul className="flex flex-col">
        {items.map((item, index) => (
          <li
          key={index}
          className="p-2 hover:bg-win95-blue hover:text-white relative"
          onMouseEnter={() => handleMouseEnter(item.name)}
          onMouseLeave={handleMouseLeave}
        >
            {item.name}
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