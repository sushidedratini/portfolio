import Taskbar from './components/Taskbar';
import DesktopIcon from './components/DesktopIcon';

const Home = () => {
  return (
    <div className="w-full h-screen bg-win95-light-gray relative bg-[url('/images/wallpaper.jpeg')] bg-cover bg-center">
      <div className="p-4 grid grid-flow-row auto-rows-max gap-4 w-36 h-full">
        <DesktopIcon name="Meu Computador" icon="/images/icons/ico/computer_explorer.ico" />
        <DesktopIcon name="Lixeira" icon="/images/icons/ico/recycle_bin_empty.ico" />
        {/* Outros ícones */}
      </div>
      <Taskbar />
    </div>
  );
};

export default Home;