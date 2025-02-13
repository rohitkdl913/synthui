import { useProject } from "../../provider/project_provider";

interface ExportDialogProp {
    onClose: () => void;

}


const ExportDialog: React.FC<ExportDialogProp> = ({ onClose }) => {

    const { project } = useProject();


    if (!project) {
        return <p>No project loaded.</p>;
    }
    return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close Button */}
            <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={onClose}
            >
                <span> &times;</span>
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">Export As</h2>

            {/* Project Name */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <p className="font-semibold">{project.projectName}</p>
            </div>

            {/* Export Options */}
            <select className="w-full p-2 border rounded mb-4">
                <option>Embed video subtitle</option>
                <option>Only subtitle file</option>
            </select>

            {/* Export Button */}
            <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
                Export
            </button>
        </div>
    </div>


}


export default ExportDialog;