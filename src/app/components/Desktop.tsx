import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";

const Desktop = () => {
  return (
    <div className="w-full h-screen bg-win98-light-gray relative bg-[url('/portfolio/images/wallpaper.jpeg')] bg-cover bg-center"
      >
      <div className="p-4 grid grid-flow-row auto-rows-max gap-4 w-36 h-full">
        <DesktopIcon name="Meu Computador" icon="/portfolio/images/icons/ico/computer_explorer.ico" />
        <DesktopIcon name="Lixeira" icon="/portfolio/images/icons/ico/recycle_bin_empty.ico" />
        {/* Outros ícones */}
      </div>
      <Taskbar />
      {/* <h2>{activeItem}</h2> */}
    </div>
  )
}

export default Desktop;
