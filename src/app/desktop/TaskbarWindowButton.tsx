import Image from 'next/image';

interface TaskbarWindowButtonProps {
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const TaskbarWindowButton: React.FC<TaskbarWindowButtonProps> = ({ title, icon, isActive, onClick }) => (
  <button
    className={`flex items-center gap-1 w-52 min-w-0 h-7 px-1.5 bg-win98-gray border-2
      ${isActive
        ? 'border-l-black border-t-black border-r-white border-b-white font-bold'
        : 'border-l-white border-t-white border-r-black border-b-black'}`}
    onClick={onClick}
    title={title}
  >
    <Image src={icon} alt="" width={20} height={20} />
    <span className="truncate">{title}</span>
  </button>
);

export default TaskbarWindowButton;
