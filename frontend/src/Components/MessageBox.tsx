import { TiWarningOutline } from "react-icons/ti";
import { MdErrorOutline } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiSquareInfo } from "react-icons/ci";



type MessageBoxProps = {
    title: string;
    message: string;
    status: 'success' | 'error' | 'warning' | 'info' | '';
}

const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const { title, message, status } = props
  return (
    <section className="fixed z-30 left-0 top-0 w-full h-full flex flex-col items-center justify-start bg-black bg-opacity-5 p-5">
        <div className="w-fit h-fit z-40 rounded-lg bg-white pl-5 pr-20 py-5 shadow-lg flex flex-row items-center justify-center gap-3">
            {status === 'success' && <IoMdCheckmarkCircleOutline size={50} className="text-c-green-50" />}
            {status === 'error' && <MdErrorOutline size={50} className="text-red-500" />}
            {status === 'warning' && <TiWarningOutline size={50} className="text-yellow-500" />}
            {status === 'info' && <CiSquareInfo size={50} className="text-c-blue-50" />}
            <article className="flex flex-col gap-1 w-full">
                <p className="text-p-lg font-medium">{title}</p>
                <p className="text-p-md text-c-grey-50">{message}</p>
            </article>
        </div>
    </section>
  )
}

export default MessageBox