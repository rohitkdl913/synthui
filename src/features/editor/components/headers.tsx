import React, { use } from 'react';
import { UploadCloud, Wand2 } from 'lucide-react';
import Branding from '../../components/branding';
import { useDialog } from '../../provider/dialog_provider';
import ExportDialog from './export_dialog';
import { Project } from '../../model/project';


interface HeadersProps {
  
    currentProject:Project  
    onGenerateWithAi: () => void;
}

const Headers: React.FC<HeadersProps> = ({ currentProject, onGenerateWithAi }) => {
    const {openDialog,closeDialog}= useDialog();



    const showExport=()=>{
        openDialog(<ExportDialog onClose={closeDialog} currentProject={currentProject}/>);
    }
    return (
        <header className="flex justify-between items-center p-4  border-b border-gray-200">
            <div className="flex items-center gap-4">
                <Branding></Branding>
                <h1 className="font-bold">{currentProject.name || "Untitled"}</h1>

            </div>

            <div className="flex gap-4">
                {/* <Tooltip text="Correct with AI" position="bottom"> */}
                <button
                    onClick={onGenerateWithAi}
                    className="flex items-center gap-2 px-4 py-2 bg-[#80419c] text-white rounded-md hover:bg-[#6a3483] transition-colors"
                >
                    <Wand2 size={18} />
                    <span>Correct with AI</span>
                </button>
                {/* </Tooltip> */}

                <button
                    onClick={showExport}
                    className="flex items-center gap-2 px-4 py-2 border border-[#80419c] rounded-md hover:bg-(--primary-light) transition-colors"
                >
                    <UploadCloud size={18} />
                    <span>Export</span>
                </button>
            </div>
        </header>
    );
};

export default Headers;