import { useState } from "react";

import { FiChevronDown, FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

interface ChoicesState {
  choiceID: string;
  choice: string;
}

type ModuleContent = 
  | { type: "separator"; lessonID: string; title: string; content: string; }
  | { type: "uploadedFile"; fileID: string; fileName: string; file: File | null; }
  | { type: "questionnaire"; questionnaireID: string; question: string; choices: ChoicesState[]; answer: string; };

interface ModuleState {
  moduleID: string;
  title: string;
  content: ModuleContent[]
}

interface MenuDataState {
  menuID: string; 
  title: string;
  modules: ModuleState[];
}

type MenuState = {
  menuID: string;
  addModule: (menuID: string) => void;
  menuData: MenuDataState;
  deleteModule: (menuID: string, moduleID: string) => void;
  selectMenu: (menuID: string) => void;
  selectModule: (moduleID: string) => void;
}

const Menu: React.FC<MenuState> = (props) => {
  const { menuID, addModule, menuData, deleteModule, selectMenu, selectModule } = props
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <section className="w-full h-auto rounded-md border cursor-pointer">
      <div className={`w-full py-1 px-2 flex items-center justify-between bg-c-green-60 ${collapse === false? "rounded-t-md" : "rounded-md "}`}>
        <p className="text-p-rg text-f-light">{menuData.title}</p>
        <button className="px-1"><FiChevronDown size={20} color="white" onClick={() => setCollapse(!collapse)}/></button>
      </div>
      <div className={`px-2 py-4 flex flex-col items-center justify-center ${collapse === false? "block" : "hidden"}`}>
        <div className="w-full">
          {menuData.modules.map((m: ModuleState) => (
            <div onClick={() => {selectMenu(menuID); selectModule(m.moduleID);}} className="w-full flex items-center justify-between mb-2 text-c-grey-50 group">
              <p key={m.moduleID}>{m.title ? m.title : 'Untitled'}</p>
              <button className="hidden group-hover:block" onClick={() => deleteModule(menuID, m.moduleID)}><IoMdClose size={16}/></button>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-center">
          <button onClick={() => addModule(menuID)} className="px-3 py-1 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/>Add Module</button>
        </div>
      </div>
    </section>
  )
}

export default Menu