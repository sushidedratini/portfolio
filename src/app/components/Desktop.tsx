import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";

const Desktop = () => {
  return (
    <div className="w-full h-screen bg-win98-light-gray relative bg-[url('/portfolio/images/wallpaper.jpeg')] bg-cover bg-center"
      >
      <div className="p-4 grid grid-flow-row auto-rows-max gap-4 w-36 h-full">
        <DesktopIcon name="Meu Computador" icon="/portfolio/images/icons/win98_icons/computer_explorer-4.png" />
        <DesktopIcon name="Lixeira" icon="/portfolio/images/icons/win98_icons/recycle_bin_full-4.png" />
        {/* Outros ícones */}
      </div>
      <Taskbar />
      {/* <h2>{activeItem}</h2> */}
    </div>
  )
}

export default Desktop;
