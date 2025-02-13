import { useRef, useState } from "react";
import { useProject } from "../../provider/project_provider";
import Headers from "../components/headers";
import Player from "../components/player";
import SidePanel from "../components/sidepanel";

import ExportDialog from "../components/export_dialog";
import { Subtitle } from "../models/subtitle";
import Timeline from "../components/timeline";


const EditorPage: React.FC = () => {
  const { project } = useProject();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showExport, setShowExport] = useState(false);

  const [subtitles] = useState<Subtitle[]>([
    { id: "1", start: 5, end: 10, text: "Hello world" },
    { id: "2", start: 15, end: 20, text: "Goodbye world" },
  ]);

  if (!project) {
    return <p>No project loaded.</p>;
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Headers projectName="test" projectId="" showExport={() => setShowExport(true)} />
      <div className="flex flex-row flex-1 overflow-hidden">
        {/* <SidePanel /> */}
        <SidePanel/>
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Player takes remaining vertical space */}
          <div className="flex-1 overflow-hidden">
            <Player
              videoRef={videoRef}
              setCurrentTime={setCurrentTime}
              setDuration={setDuration}
            />
          </div>
          {/* Timeline fixed to bottom */}
          <div className="h-1/4 overflow-hidden">
            <Timeline
              videoRef={videoRef}
              currentTime={currentTime}
              duration={duration}
              subtitles={subtitles}
              onSubtitleSelect={(id) => console.log("Selected subtitle:", id)}
            />


            {/* Modal for Project Creation */}
            {showExport && (
              <ExportDialog onClose={() => setShowExport(false)}></ExportDialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
