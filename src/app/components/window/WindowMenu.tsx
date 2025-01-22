import React from 'react';
import Image from 'next/image'

// TODO: Turn the Sections into Custom Components

const WindowMenu: React.FC = () => (
  <div className="flex flex-col my-0.5 border-t-2 border-2 border-win98-dark-gray">
    <section className="flex flex-row justify-between border-t-2 border-t-white border-l-2 border-l-white">
      <div className="flex items-start mx-0.5 bg-win98-gray text-black text-xs select-none">
        <div className="flex items-start my-0.5">
          <div className="w-1 h-5 mr-1 bg-win98-gray border border-l-white border-t-white border-r-win98-dark-gray border-b-win98-dark-gray cursor-col-resize" />
          <button className="px-2 border-2 border-transparent hover:border-t-2 hover:border-l-2 hover:border-t-white hover:border-l-white hover:border-b-2 hover:border-r-2 hover:border-b-win98-dark-gray hover:border-r-win98-dark-gray">A̲rquivo</button>
          <button className="px-2 border-2 border-transparent hover:border-t-2 hover:border-l-2 hover:border-t-white hover:border-l-white hover:border-b-2 hover:border-r-2 hover:border-b-win98-dark-gray hover:border-r-win98-dark-gray">E̲ditar</button>
          <button className="px-2 border-2 border-transparent hover:border-t-2 hover:border-l-2 hover:border-t-white hover:border-l-white hover:border-b-2 hover:border-r-2 hover:border-b-win98-dark-gray hover:border-r-win98-dark-gray">Aju̲da</button>
        </div>
      </div>
      <div className="flex items-center justify-center w-10 h-auto bg-black select-none">
        <Image src="/portfolio/images/icons/win98_icons/windows_slanted-1.png" alt="Windows Logo" width={20} height={20}/>
      </div>
    </section>
    {/* <hr className="border-t-2 border-t-win98-dark-gray"></hr>
    <section className="border-t-2 border-t-white border-l-2 border-l-white">
      <div className="flex items-start mx-0.5 bg-win98-gray text-black text-xs select-none">
        <div className="flex items-start my-0.5">
          <div className="w-1 h-5 mr-1 bg-win98-gray border border-l-white border-t-white border-r-win98-dark-gray border-b-win98-dark-gray cursor-col-resize" />
          <button className="px-2 border-2 border-transparent hover:border-t-2 hover:border-l-2 hover:border-t-white hover:border-l-white hover:border-b-2 hover:border-r-2 hover:border-b-win98-dark-gray hover:border-r-win98-dark-gray">A̲rquivo</button>
          <button className="px-2 border-2 border-transparent hover:border-t-2 hover:border-l-2 hover:border-t-white hover:border-l-white hover:border-b-2 hover:border-r-2 hover:border-b-win98-dark-gray hover:border-r-win98-dark-gray">E̲ditar</button>
          <button className="px-2 border-2 border-transparent hover:border-t-2 hover:border-l-2 hover:border-t-white hover:border-l-white hover:border-b-2 hover:border-r-2 hover:border-b-win98-dark-gray hover:border-r-win98-dark-gray">Aju̲da</button>
        </div>
      </div>
    </section> */}
  </div>
);

export default WindowMenu;