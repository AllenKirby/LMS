type ParticipantUploadedDocumentProps = {
  onClose: () => void;
};
const ParticipantUploadedDocument: React.FC<
  ParticipantUploadedDocumentProps
> = (props) => {
  return (
    <>
      <div className="fixed inset-0 z-20 bg-black opacity-50" />
      <div className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-end">
        <form className="w-2/5 h-full bg-f-light z-30 flex flex-col text-f-dark">
          <header className="flex items-center justify-between px-5 py-3">
            <h6 className="text-p-lg font-medium">Participant Name</h6>
            <button onClick={props.onClose}>&times;</button>
          </header>
        </form>
      </div>
    </>
  );
};

export default ParticipantUploadedDocument;
