import { BsQuestionCircleFill } from "react-icons/bs";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

const Separator = () => {
  return (
        <section className="w-full h-fit border rounded-md">
            <header className="w-full flex items-center justify-between border-b p-3 bg-c-grey-5 rounded-t-md">
                <p className="font-medium flex items-center gap-1"><BsQuestionCircleFill size={20} color="blue"/>Learning Materials (IMG, VIDEO, DOCUMENT)</p>
                <div className="flex items-center justify-center gap-2">
                    <button><BiDownArrowAlt size={24} color="gray"/></button>
                    <button><BiUpArrowAlt size={24} color="gray"/></button>
                    <button><RiDeleteBinLine size={24} color="gray"/></button>
                </div>
            </header>
            <div className="w-full p-3 flex flex-col">
                <input type="text" className="w-full p-2 text-p-lg" placeholder="Untitled separtor name" />
                <input type="text" className="w-full p-2" placeholder="Description text (optional)" />
            </div>
        </section>
  )
}

export default Separator