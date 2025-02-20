import { useState } from "react";

import { FiChevronDown, FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

type MenuState = {
  deleteMenu: (id: string) => void;
  menuID: string;
  setData: (type: string, menuID: string, value: string) => void;
  addModule: (menuID: string) => void;
  modules: {moduleID: string, title: string, position: number}[];
  setSelectedMenu: (menuID: string) => void
  deleteModule: (menuID: string, moduleID: string) => void
}

const Menu: React.FC<MenuState> = (props) => {
  const { deleteMenu, menuID, setData, addModule, modules, setSelectedMenu, deleteModule } = props
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <section onClick={() => setSelectedMenu(menuID)} className="w-full h-auto rounded-md border cursor-pointer">
        <div className={`w-full p-1 flex items-center justify-between bg-c-green-60 ${collapse === false? "rounded-t-md" : "rounded-md "}`}>
          <input type="text" onChange={(e) => setData('menuTitle', menuID, e.target.value)} className="bg-transparent p-1 text-f-light outline-none" placeholder="Menu title"/>
          <button className="px-1"><FiChevronDown size={20} color="white" onClick={() => setCollapse(!collapse)}/></button>
        </div>
        <div className={`px-2 py-4 flex flex-col items-center justify-center ${collapse === false? "block" : "hidden"}`}>
            <div className="w-full">
                {modules.map((m) => (
                  <div className="w-full flex items-center justify-between mb-2 text-c-grey-50 group">
                    <p key={m.moduleID}>{m.title ? m.title : 'Untitled'}</p>
                    <button className="hidden group-hover:block" onClick={() => deleteModule(menuID, m.moduleID)}><IoMdClose size={16}/></button>
                  </div>
                ))}
            </div>
            <div className="w-full flex items-center justify-between">
              <button onClick={() => deleteMenu(menuID)} className="text-c-grey-50 hover:text-red-500 transition-all duration-150">
                <RiDeleteBinLine size={20}/>
              </button>
              <button onClick={() => addModule(menuID)} className="px-3 py-1 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/>Add Module</button>
            </div>
        </div>
    </section>
  )
}

export default Menu