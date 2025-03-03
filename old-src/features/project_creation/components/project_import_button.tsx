import { CiImport } from "react-icons/ci";

const ProjectImportButton = () => {
    return <div className="flex flex-col justify-center items-center bg-(--secondary) rounded py-8 px-8 hover:bg-(--hover)">
        <CiImport size={30} />
        <div className="hidden sm:flex flex-col items-center mt-2">
            <span className="text-lg font-bold ">Import Project</span>
            <span className="text-center">Import .synth file from computer</span>
        </div>
    </div>
}



export default ProjectImportButton;