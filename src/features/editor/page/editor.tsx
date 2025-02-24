import { useEffect, useRef, useState } from "react";
import { useProject } from "../../provider/project_provider";
import Headers from "../components/headers";
import Player from "../components/player";
import SidePanel from "../components/sidepanel";

import ExportDialog from "../components/export_dialog";
import Timeline from "../components/timeline";
import { Subtitle, useSubtitles } from "../../provider/subtitle_provider";
import { useNavigate, useParams } from "react-router-dom";
import APIRoute from "../../../api_route";
import InfoDialog from "../../components/info_dialog";


const EditorPage: React.FC = () => {
  const { project, setProject } = useProject();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showExport, setShowExport] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addSubtitle,setSelectedSubtitle } = useSubtitles()
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null)

  const indexRef = useRef(1);


  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${APIRoute.projectStatus}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data.status === false && data.data.translationType !== "REALTIME") {
          console.log("Redirecting to home...");
          setMessage("Redirecting to home..."); // Show info message
          navigate("/");
          return;
        }

        setProject({ projectName: data?.data?.name, projectId: data.data.id, translationType: data.data.translationType, status: data.data.status }); // Update your project context
        if (data.data.subtitle !== null) {
          console.log(data);
          if (data.data != null) {
            // Format subtitles to match `Subtitle` interface
            const formattedSubtitles: Subtitle[] = data.data.subtitle.map((sub: any, index: number) => ({
              id: sub.id, // Assuming `id` is not provided, using index as fallback
              text: sub.text,
              start: sub.start_time,
              end: sub.end_time,
              alignment: 'center', // Default value, update if needed
              fontSize: 16 // Default value, update if needed
            }));

            for (let index = 0; index < formattedSubtitles.length; index++) {
              addSubtitle(formattedSubtitles[index])
            }
            setSelectedSubtitle(null);
          }

        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectData();
    }
  }, [id, setProject]);





  useEffect(() => {
    let eventSource: EventSource | null = null;

    const connectToSSE = () => {
      eventSource = new EventSource(`${APIRoute.projectStream}/${project?.projectId}`);

      eventSource.addEventListener('update', handleUpdate);
      eventSource.addEventListener('done', handleComplete);
      eventSource.addEventListener('open', (_: MessageEvent) => {
        console.log("Keep alive");
      });
      eventSource.onerror = handleError;
    };

    const handleUpdate = (event: MessageEvent) => {
      try {
        const subtitleData = JSON.parse(event.data);

        console.log(`Get the data ${subtitleData} ${event.data}`)
        addSubtitle({
          id: (indexRef.current++).toString(),
          text: subtitleData.text,
          start: subtitleData.start,
          end: subtitleData.end,
          alignment: "center",
          fontSize: 16,
        });



      } catch (err) {
        console.error("Error processing update:", err);
      }
    };

    const handleComplete = () => {
      console.log("Transcription stream completed");
      eventSource?.close();
    };

    const handleError = (err: Event) => {
      console.error("SSE error:", err);
      eventSource?.close();
      setTimeout(connectToSSE, 5000);  // Reconnect after 5 seconds
    };

    if (project?.projectId && !project?.status) {
      connectToSSE();
    }

    return () => {
      eventSource?.close();
    };
  }, [project?.projectId, project?.status, addSubtitle]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-lg">Loading project {id}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error Loading Project</h2>
          <p className="mt-4">{error}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return <p>No project loaded.</p>;
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Headers projectName={project.projectName} showExport={() => setShowExport(true)} />
      <div className="flex flex-row flex-1 overflow-hidden">
        {/* <SidePanel /> */}
        <SidePanel />
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
            {videoRef != null && <Timeline
              videoRef={videoRef}
              currentTime={currentTime}
              duration={duration}
            />
            }


            {/* Modal for Project Creation */}
            {showExport && (
              <ExportDialog onClose={() => setShowExport(false)}></ExportDialog>
            )}

            {message != null && <InfoDialog message={message} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;



const LoadingSpinner: React.FC = () => {
  return (
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

