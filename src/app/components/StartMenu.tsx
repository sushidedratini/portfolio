"use client";

import React, { useMemo, useState } from 'react';
import SubMenu from './SubMenu';
import { MenuItem } from '../commons/types';
import Image from 'next/image';

const StartMenu = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        name: 'P̲rogramas',
        icon: '/portfolio/images/icons/win98_icons/directory_programs_new.png',
        submenu: [
          { name: 'Acessórios', icon: '', submenu: [
            { name: 'Jogos', icon: '', submenu: [
              { name: 'FreeCell', icon: '', submenu: [] },
              { name: 'Hearts', icon: '', submenu: [] },
              { name: 'Minesweeper', icon: '', submenu: [] },
              { name: 'Solitaire', icon: '', submenu: [] }
            ] }
          ] },
          
          { name: 'Ferramentas do Sistema', icon: '', submenu: [] }
        ]
      },
      {
        name: 'Fav̲oritos',
        icon: '/portfolio/images/icons/win98_icons/directory_favorites-2.png',
        submenu: []
      },
      {
        name: 'D̲ocumentos',
        icon: '/portfolio/images/icons/win98_icons/directory_open_file_mydocs-4.png',
        submenu: []
      },
      {
        name: 'C̲onfigurações',
        icon: '/portfolio/images/icons/win98_icons/settings_gear_new.png',
        submenu: [
          { name: 'Controle', icon: '', submenu: [] },
          { name: 'Impressoras', icon: '', submenu: [] },
          { name: 'Opções de Internet', icon: '', submenu: [] }
        ]
      },
      { name: 'L̲ocalizar', icon: '/portfolio/images/icons/win98_icons/search_directory-5.png', submenu: [] },
      { name: 'A̲juda', icon: '/portfolio/images/icons/win98_icons/help_book_big-0.png', submenu: [] },
      { name: 'Ex̲ecutar...', icon: '/portfolio/images/icons/win98_icons/application_hourglass_small_cool-4.png', submenu: [] },
      // { name: 'Efetuar Logof...', icon: '', submenu: [] },
      { name: 'Deslig̲ar...', icon: '/portfolio/images/icons/win98_icons/shut_down_with_computer-0.png', submenu: [] }
    ],
    []
  );

  const handleMouseEnter = (name: string) => {
    setOpenSubMenu(name);
  };

  const handleMouseLeave = () => {
    setOpenSubMenu(null);
  };

  return (
    <div className="absolute bottom-9 left-0 w-52 bg-win98-gray border-t-2 border-t-white border-b-2 border-b-black border-r-2 border-r-black border-solid text-black text-sm font-win98">
      <div className="flex flex-row p-0.5">
        <div className="relative items-center bg-[linear-gradient(180deg,#080878,#0000FF,#080878)] bg-w text-white font-win98 text-lg w-7 justify-center">
          <p className="absolute -rotate-90 whitespace-nowrap bottom-10 -left-9"><strong>Windows</strong>&nbsp;98</p>
        </div>
        <ul className="flex flex-col w-full">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-win98-dark-blue hover:text-white relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-row justify-between">
                <div className="flex gap-3">
                  <Image src={item.icon} alt={item.name} width={25} height={25} />
                  <p className="flex items-center justify-center">{item.name}</p>
                </div>
                {item.submenu.length > 0 && (
                  <p className="flex items-end justify-center">▸</p>
                )}

              </div>
              {item.submenu.length > 0 && openSubMenu === item.name && (
                <SubMenu items={item.submenu} />
              )}
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default StartMenu;