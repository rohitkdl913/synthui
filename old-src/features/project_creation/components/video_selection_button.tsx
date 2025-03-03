import { BsUpload } from "react-icons/bs";

const VideoSelectionButton = () => {
    return <div className="flex flex-col justify-center items-center bg-(--secondary) p-8 rounded hover:bg-(--hover)">
        <BsUpload size={30} />
        <div className="hidden sm:flex flex-col items-center mt-2">
            <span className="text-lg font-bold">Choose a Video</span>
            <span className="text-center">Upload a video to generate subtitle</span>
        </div>
    </div>
}



export default VideoSelectionButton;