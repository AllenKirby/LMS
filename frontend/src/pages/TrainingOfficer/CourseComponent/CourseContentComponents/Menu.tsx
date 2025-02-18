import { useState } from "react";
import { FiChevronDown, FiPlus } from "react-icons/fi";

const Menu = () => {
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <section className="w-full h-auto rounded-md border">
        <div className={`w-full p-1 flex items-center justify-between bg-c-green-60 ${collapse === false? "rounded-t-md" : "rounded-md "}`}>
        <input type="text" className="bg-transparent p-1 text-f-light outline-none" placeholder="Menu title"/>
        <button className="px-1"><FiChevronDown size={20} color="white" onClick={() => setCollapse(!collapse)}/></button>
        </div>
        <div className={`px-2 py-4 flex flex-col items-center justify-center ${collapse === false? "block" : "hidden"}`}>
            <div className="w-full">
                
            </div>
            <button className="px-3 py-1 flex items-center justify-center gap-2 text-c-blue-50 bg-c-blue-5 rounded-full"><FiPlus size={20}/>Add Module</button>
        </div>
    </section>
  )
}

export default Menu