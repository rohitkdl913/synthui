import { X } from "lucide-react";
import APIRoute from "../../../api_route";
import { Project } from "../../model/project";

interface ExportDialogProp {
    onClose: () => void;
    currentProject: Project
}


const ExportDialog: React.FC<ExportDialogProp> = ({ onClose, currentProject }) => {




    const handleExport = async () => {
        if (!currentProject) return;

        try {
            // Assuming the API returns the SRT file for subtitles
            const response = await fetch(`${APIRoute.exportSubtitle}/${currentProject.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream', // For binary file download
                },
            });

            if (!response.ok) {
                throw new Error('Failed to export subtitles');
            }

            // Handle the SRT file response
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${currentProject.name}.srt`; // Name the file with project name
            link.click();

        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    if (!currentProject) {
        return <p>No project loaded.</p>;
    }
    return <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close Button */}
            <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={onClose}
            >
                <X></X>
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">Export As</h2>

            {/* Project Name */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-25 h-16 bg-gray-200 rounded">
                    <img src={`${APIRoute.streamThumbnail}/${currentProject.id}`} className="w-full h-full object-fill" />
                </div>
                <p className="font-semibold">{currentProject.name}</p>
            </div>

            {/* Export Options */}
            <select className="w-full p-2 border rounded mb-4 focus:border-[#80419c] focus:outline-none focus:ring-1 focus:ring-[#80419c]">
                {/* <option>Embed video subtitle</option> */}
                <option value={"SUBTITLE"}>Only subtitle file</option>
            </select>

            {/* Export Button */}
            <button className="bg-(--primary-color) text-white w-full py-2 rounded hover:bg-(--primary-hover)" onClick={handleExport}>
                Export
            </button>
        </div>
    </div>


}


export default ExportDialog;