import { useProject } from "../../provider/project_provider";
import Headers from "../components/headers";
import Player from "../components/player";
import SidePanel from "../components/sidepanel";
import Timeline from "../components/timeline";

const EditorPage: React.FC = () => {
    const { project } = useProject();

    if (!project) {
        return <p>No project loaded.</p>;
    }

    return (
        <div className="editor flex flex-col h-screen w-screen">
            <Headers />
            <div className="flex flex-row flex-auto">
                <SidePanel />
                <div className="right-section flex flex-4 flex-col">
                    <Player />
                    <Timeline />
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
