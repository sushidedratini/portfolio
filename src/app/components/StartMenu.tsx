import React, { useState } from 'react';
import SubMenu from './SubMenu';
import { MenuItem } from '../commons/types';

const StartMenu = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { name: 'Programas', submenu: [
      {name: 'Acessórios', submenu: []},
      {name: 'Jogos', submenu: []},
      {name: 'Ferramentas do Sistema', submenu: []}
    ]},
    { name: 'Documentos', submenu: [] },
    { name: 'Configurações', submenu: [
      {name: 'Controle', submenu: []},
      {name: 'Impressoras', submenu: []},
      {name: 'Opções de Internet', submenu: []}
    ]},
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
    <div className="absolute bottom-10 left-0 bg-win95-light-gray border border-win95-dark-gray w-48 text-black text-sm font-win95">
      <ul className="flex flex-col">
        {menuItems.map((item, index) => (
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

export default StartMenu;