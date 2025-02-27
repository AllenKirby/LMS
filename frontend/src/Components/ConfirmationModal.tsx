import ReactDOM from 'react-dom';

interface ConfirmationModalProps {
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    label: string;
  }
  
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({onClose, onConfirm, title, label}) => {
    return ReactDOM.createPortal(
    <>
    <div className="fixed inset-0 z-20 bg-black opacity-30"></div>
    <section className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center">
        <div className="w-[400px] h-fit text-f-dark">
            <header className="w-full h-full rounded-t-lg bg-c-grey-5 flex items-center justify-between px-4 py-3">
                <h6 className="font-semibold">{title}</h6>
                <button className='text-p-lg font-semibold' onClick={onClose}>&times;</button>
            </header>
            <div className="w-full h-fit border-b px-4 py-6 bg-white">
                <p>{label}</p>
            </div>
            <footer className="flex items-center justify-end gap-3 rounded-b-lg bg-white px-4 py-3">
                <button className="rounded-md font-medium px-6 py-2 border" onClick={onClose}>Cancel</button>
                <button className="rounded-md text-f-light font-medium px-6 py-2 bg-c-blue-50" onClick={onConfirm}>Confirm</button>
            </footer>
        </div>
    </section>
    </>, 
    document.body
  );
}

export default ConfirmationModal