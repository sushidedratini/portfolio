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
      className={`p-1 bg-win98-gray 
            ${isActive
          ? 'border-l-black border-t-black border-r-white border-b-white border-2' // Estilo quando ativo
          : 'border-l-white border-t-white border-r-black border-b-black border-2' // Estilo padrão
        }`}

      onClick={() => isActive ? setActiveItem(null) : setActiveItem(name)}
    >
      <div className={`flex
        ${isActive ? 'outline-dashed outline-1 outline-black' : ''}`}>
        {icon && <Image src={icon} alt={name} width={20} height={4} />}
        {text}
      </div>
    </button>
  );
};

export default StartButton;