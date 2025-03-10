import { MdFullscreen, MdFullscreenExit, MdPause, MdPlayArrow, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useProject } from "../../provider/project_provider";
import APIRoute from "../../../api_route";
import { useSubtitles } from "../../provider/subtitle_provider";

interface PlayerProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
}

const Player: React.FC<PlayerProps> = ({ videoRef, setCurrentTime, setDuration }) => {
    const { project } = useProject();
    const { subtitles } = useSubtitles(); // Get subtitles from context


    const [muted, setMuted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null); // Ref for fullscreen container
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [currentSubtitle, setCurrentSubtitle] = useState("");


    const togglePlayPause = () => {
        if (playing) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }
        setPlaying(!playing);
    };

    const toggleMuted = () => {
        if (videoRef.current) {
            videoRef.current.muted = !muted;
        }
        setMuted(!muted);
    };
    // Fullscreen toggle handler
    const toggleFullscreen = () => {
        const element = containerRef.current;
        if (!element) return;

        if (isFullscreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) { /* Safari */
                (document as any).webkitExitFullscreen();
            }
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if ((element as any).webkitRequestFullscreen) { /* Safari */
                (element as any).webkitRequestFullscreen();
            }
        }
    };



    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [videoRef, setCurrentTime, setDuration]);


    useEffect(() => {
        const updateSubtitle = () => {
            if (!videoRef.current) return;

            const currentTime = videoRef.current.currentTime;
            const activeSubtitle = subtitles.find(sub =>
                currentTime >= sub.start && currentTime <= sub.end
            );

            setCurrentSubtitle(activeSubtitle?.text || "");
        };

        const interval = setInterval(updateSubtitle, 100);
        return () => clearInterval(interval);
    }, [subtitles, videoRef]);

    return (
        <div ref={containerRef} className="p-4 flex flex-col justify-between h-full">
            <div className="bg-primary p-4 flex flex-col justify-between h-full">
                {/* Video Container */}
                <div className="relative bg-secondary rounded-lg h-[90%] flex items-center justify-center">
                    <video
                        preload="auto"
                        ref={videoRef}
                        className="h-full rounded-lg"
                        src={APIRoute.VideoStream + "/" + project?.projectId}
                    ></video>
                    {currentSubtitle && (
                        <div className={`absolute bottom-4 backdrop-blur text-white px-4 py-2 rounded-md text-sm text-center`} style={{ width: videoRef.current?.clientWidth }}>
                            {currentSubtitle}
                        </div>
                    )}
                </div>
                {/* Controls */}
                <div className="flex justify-between items-center py-4 text-white">
                    <div className="cursor-pointer" onClick={toggleMuted}>
                        {muted ? <MdVolumeOff size={24} /> : <MdVolumeUp size={24} />}
                    </div>
                    <div className="cursor-pointer" onClick={togglePlayPause}>
                        {playing ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
                    </div>
                    <div className="cursor-pointer" onClick={toggleFullscreen}>
                        {isFullscreen ? <MdFullscreenExit size={24} /> : <MdFullscreen size={24} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
