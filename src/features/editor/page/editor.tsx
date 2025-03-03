import { useRef, useState } from "react";
import { useEditorPageLogic } from "../controller/editor_logic";
import Headers from "../components/headers";
import Player from "../components/player";
import SidePanel from "../components/sidepanel";

import Timeline from "../components/timeline";

import CorrectWithAiLoading from "../components/correct_with_ai_loading";

const Editor: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const {
    currentProject,

    loading,
    error,
    ailoading,
    onGenerateWithAi,
  } = useEditorPageLogic();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (loading) {
    return <LoadingMessage message={`Loading project ${currentProject?.name}...`} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {ailoading && <CorrectWithAiLoading />}
      <Headers
        currentProject={currentProject!}

        onGenerateWithAi={onGenerateWithAi}
      />
      <div className="flex flex-row flex-1 overflow-hidden">
        <SidePanel />
        <div className="flex flex-col flex-4 overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <Player
              videoRef={videoRef}
              setCurrentTime={setCurrentTime}
              setDuration={setDuration}
            />
          </div>
          <div className="h-1/4 overflow-hidden">
            {videoRef && (
              <Timeline
                videoRef={videoRef}
                currentTime={currentTime}
                duration={duration}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center justify-center h-screen bg-[var(--primary-light)]">
    <div className="text-center">
      <LoadingSpinner />
      <p className="mt-4 text-lg text-[var(--primary-color)]">{message}</p>
    </div>
  </div>
);

const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <div className="flex items-center justify-center h-screen bg-[var(--primary-light)]">
    <div className="text-center text-red-600">
      <h2 className="text-2xl font-bold">Error Loading Project</h2>
      <p className="mt-4">{error}</p>
    </div>
  </div>
);

const LoadingSpinner: React.FC = () => (
  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--primary-color)] border-t-transparent">
    <span className="sr-only">Loading...</span>
  </div>
);


export default Editor;

