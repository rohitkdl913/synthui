import ProjectImportButton from "./project_import_button";
import VideoSelectionButton from "./video_selection_button";

const SidePanel = () => {
    return <aside className="flex sm:flex-2 flex-col mt-7 gap-10 pl-2 pr-4 overflow-hidden flex-1">
        <VideoSelectionButton></VideoSelectionButton>
        <ProjectImportButton></ProjectImportButton>
    </aside>
}




export default SidePanel;