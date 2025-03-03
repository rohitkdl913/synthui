import { ArrowUpCircle } from "lucide-react";
import { useDialog } from "../../provider/dialog_provider";
import { useRef } from "react";
import ProjectCreationDialog from "./project_creation_dialog";

const UploadNewVideo = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { openDialog, closeDialog } = useDialog();

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {

            console.log("Selected video file:", file);

            openDialog(
                <ProjectCreationDialog
                    onClose={closeDialog}
                    fileName="example.txt"
                    file={file}
                    fileSize={file.size}
                />
            );
        }
    };

    return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
            />
            <h2 className="text-lg font-medium text-gray-800 mb-2">Create New Project</h2>
            <p className="text-gray-500 mb-4">Upload a video to generate Nepali subtitles</p>

            <div className="max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#80419c] transition cursor-pointer bg-gray-50 hover:bg-[#f3ebf6]" onClick={handleUploadClick}>
                <div className="flex flex-col items-center">
                    <ArrowUpCircle className="h-12 w-12 text-[#80419c] mb-3" />
                    <p className="text-sm text-gray-500 mb-2">Drag and drop or click to upload</p>
                    <p className="text-xs text-gray-400">Supports MP4, MOV, AVI (Max 1GB)</p>
                </div>
            </div>
        </div>
    </div>
}

export default UploadNewVideo;

