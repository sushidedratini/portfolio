interface CustomButtonProps {
  name: string;
  icon?: string;
  text: string;
  isActive: boolean;
  setActive: CallableFunction;
}

const CustomButton: React.FC<CustomButtonProps> = ({ name, icon, text, isActive, setActive }) => {

  return (
    <button
      className={`p-1 bg-gray-200 
            ${isActive
          ? 'border-l-black border-t-black border-r-white border-b-white border-2' // Estilo quando ativo
          : 'border-l-white border-t-white border-r-black border-b-black border-2' // Estilo padrão
        }`}

      onClick={() => setActive(!isActive)}
    >
      <div className={`flex
        ${isActive ? 'outline-dashed outline-1 outline-black' : ''}`}>
        {icon && <img src={icon} alt={name} width={20} height={4}/>}
        {text}
      </div>
    </button>
  );
};

export default CustomButton;