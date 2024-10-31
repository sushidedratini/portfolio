import React, { useState } from 'react';
import SubMenu from './SubMenu';
import { MenuItem } from '../commons/types';

const StartMenu = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      name: 'Programas', submenu: [
        { name: 'Acessórios', submenu: [] },
        { name: 'Jogos', submenu: [] },
        { name: 'Ferramentas do Sistema', submenu: [] }
      ]
    },
    { name: 'Documentos', submenu: [] },
    {
      name: 'Configurações', submenu: [
        { name: 'Controle', submenu: [] },
        { name: 'Impressoras', submenu: [] },
        { name: 'Opções de Internet', submenu: [] }
      ]
    },
    { name: 'Pesquisar', submenu: [] },
    { name: 'Ajuda', submenu: [] },
    { name: 'Executar...', submenu: [] },
    { name: 'Efetuar Logof...', submenu: [] },
    { name: 'Desligar...', submenu: [] }
  ];

  const handleMouseEnter = (name: string) => {
    setOpenSubMenu(name);
  };

  const handleMouseLeave = () => {
    setOpenSubMenu(null);
  };

  return (
    <div className="absolute bottom-9 left-0 w-48 bg-win98-gray border-t-2 border-t-white border-b-2 border-b-black border-r-2 border-r-black border-solid text-black text-sm font-win98">
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
              {item.name}
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