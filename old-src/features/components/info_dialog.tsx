interface InfoDialogProps{
    message:string
}

const InfoDialog:React.FC<InfoDialogProps> = ({message}) => {
    return <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 animate-fade-out">
      {message}
    </div>
}


export default InfoDialog;