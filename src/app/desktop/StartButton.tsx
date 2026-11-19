import Image from 'next/image'
import { useActiveItem } from './ActiveItemContext';

interface StartButtonProps {
  name: string;
  icon?: string;
  text: string;
}

const StartButton: React.FC<StartButtonProps> = ({ name, icon, text }) => {
  const { activeItem, setActiveItem } = useActiveItem();
  const isActive = activeItem === name;

  return (
    <button
      className={`flex items-center h-7 px-1.5 bg-win98-gray font-bold 
            ${isActive
          ? 'border-l-black border-t-black border-r-white border-b-white border-2' // Estilo quando ativo
          : 'border-l-white border-t-white border-r-black border-b-black border-2' // Estilo padrão
        }`}

      onClick={() => isActive ? setActiveItem(null) : setActiveItem(name)}
    >
      <div className={`flex items-center gap-1.5 pr-0.5
        ${isActive ? 'outline-dashed outline-1 outline-black' : ''}`}>
        {icon && <Image src={icon} alt={name} width={20} height={20} />}
        {text}
      </div>
    </button>
  );
};

export default StartButton;