import { useState } from "react";

import { FiChevronDown, FiPlus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";

import { ModuleState, MenuDataState, CourseActionType, ModulePreview } from '../../../../types/CourseCreationTypes'
import { useDispatch } from "react-redux";
import { useTrainingOfficerHook } from "../../../../hooks/";
import {setMenuTitle} from '../../../../redux/CourseContentDataRedux'

type MenuState = {
  menuData: MenuDataState;
  addModule: (id: number) => void;
  modules: ModuleState[];
  deleteMenu: (id: number) => void;
  deleteModule: (id: string) => void;
  deleteModulePermanent: (id: number, moduleID: string) => void;
  courseAction: CourseActionType;
  setMenuID: (id: number) => void;
  setModuleID: (id: number | string) => void;
}

const Menu: React.FC<MenuState> = (props) => {
  const { menuData, addModule, modules, deleteModule, deleteModulePermanent, deleteMenu, courseAction, setMenuID, setModuleID } = props
  const [collapse, setCollapse] = useState<boolean>(false);
  const { SetMenuTitle } = useTrainingOfficerHook()
  const dispatch = useDispatch()

  const filteredModules = modules.filter((module) => module.menuID === menuData.id);

  const handleClickModule = (moduleID: string | number) => {
      setMenuID(menuData.id)
      setModuleID(moduleID)
  }

  const sortedItems = (items: ModuleState[]) => {
    const sortedModules =  items.sort((a, b) => {
      if (a.position == null) return 1;
      if (b.position == null) return -1;
      return a.position - b.position;
    });

    return courseAction === 'update' ? sortedModules : items
  };


  return (
    <section className="w-full h-auto rounded-md border border-c-grey-20 cursor-pointer">
      <div className={`w-full px-4 py-2 flex items-center justify-between text-f-dark ${collapse === false? "rounded-t-md border-b" : "rounded-md"}`}>
        <input 
          type="text" 
          value={menuData.title}
          onChange={(e) => dispatch(setMenuTitle({ id: menuData.id, title: e.target.value }))}
          className="bg-transparent p-1 text-sm font-medium outline-none w-full" 
          onBlur={async() => {
            const menuTitle = {
              title: menuData.title
            }
            await SetMenuTitle(menuData.id, menuTitle)
            console.log('okay')
          }}
          placeholder="Menu Title"/>
        <button className="px-1"><FiChevronDown size={20}  onClick={() => setCollapse(!collapse)}/></button>
      </div>
      <div className={`px-4 py-2 flex flex-col items-center justify-center ${collapse === false? "block" : "hidden"}`}>
        <div className="w-full mb-2">
          {sortedItems(filteredModules).map((m: ModuleState | ModulePreview) => (
            <div onClick={() => handleClickModule(m.moduleID)} className="w-full flex items-center justify-between mb-2 text-c-grey-50 group">
              <section className="flex items-center gap-2 group-hover:text-c-grey-70 group-hover:font-medium">
                <HiMenuAlt2 size={12}/>
                <p>{m.title ? m.title : 'Untitled'}</p>
              </section>
              {('submitted' in m && m?.submitted || courseAction === 'update' ) ? (
                <button onClick={() => deleteModulePermanent(m.id, m.moduleID)} className="hidden group-hover:block text-red-500"><IoMdClose size={16}/></button>
              ) : (
                <button onClick={() => deleteModule(m.moduleID)} className="hidden group-hover:block text-red-500"><IoMdClose size={16}/></button>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-center">
          <button onClick={() => {addModule(menuData.id)}} className="w-full h-fit py-1 flex items-center justify-center text-f-dark bg-white rounded-sm border"><FiPlus size={20}/></button>
          <button onClick={() => {deleteMenu(menuData.id)}} className="w-full h-fit py-1 flex items-center justify-center text-red-500 bg-white rounded-sm border"><AiOutlineDelete size={20}/></button>
        </div>
      </div>
    </section>
  )
}

export default Menu