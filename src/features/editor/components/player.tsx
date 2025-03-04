// import { Maximize, Minimize, Pause, Play, VolumeX, Volume2 } from 'lucide-react';

// import { useEffect, useRef, useState } from "react";
// import { useProject } from "../../provider/project_provider";
// import APIRoute from "../../../api_route";
// import { useSubtitles } from "../../provider/subtitle_provider";
// import { useEditorPageLogic } from '../controller/editor_logic';

// interface PlayerProps {
//     videoRef: React.RefObject<HTMLVideoElement | null>;
//     setCurrentTime: (time: number) => void;
//     setDuration: (duration: number) => void;
// }

// const Player: React.FC<PlayerProps> = ({ videoRef, setCurrentTime, setDuration }) => {
//     const { currentProject } = useEditorPageLogic();
//     const { subtitles } = useSubtitles(); // Get subtitles from context


//     const [muted, setMuted] = useState(false);
//     const [playing, setPlaying] = useState(false);
//     const containerRef = useRef<HTMLDivElement>(null); // Ref for fullscreen container
//     const [isFullscreen, setIsFullscreen] = useState(false);

//     const [currentSubtitle, setCurrentSubtitle] = useState("");


//     const togglePlayPause = () => {
//         if (playing) {
//             videoRef.current?.pause();
//         } else {
//             videoRef.current?.play();
//         }
//         setPlaying(!playing);
//     };

//     const toggleMuted = () => {
//         if (videoRef.current) {
//             videoRef.current.muted = !muted;
//         }
//         setMuted(!muted);
//     };
//     // Fullscreen toggle handler
//     const toggleFullscreen = () => {
//         const element = containerRef.current;
//         if (!element) return;

//         if (isFullscreen) {
//             if (document.exitFullscreen) {
//                 document.exitFullscreen();
//             } else if ((document as any).webkitExitFullscreen) { /* Safari */
//                 (document as any).webkitExitFullscreen();
//             }
//         } else {
//             if (element.requestFullscreen) {
//                 element.requestFullscreen();
//             } else if ((element as any).webkitRequestFullscreen) { /* Safari */
//                 (element as any).webkitRequestFullscreen();
//             }
//         }
//     };



//     // Listen for fullscreen changes
//     useEffect(() => {
//         const handleFullscreenChange = () => {
//             setIsFullscreen(!!document.fullscreenElement);
//         };

//         document.addEventListener('fullscreenchange', handleFullscreenChange);
//         document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari

//         return () => {
//             document.removeEventListener('fullscreenchange', handleFullscreenChange);
//             document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
//         };
//     }, []);

//     useEffect(() => {
//         const video = videoRef.current;
//         if (!video) return;

//         const handleTimeUpdate = () => setCurrentTime(video.currentTime);
//         const handleLoadedMetadata = () => setDuration(video.duration);

//         video.addEventListener("timeupdate", handleTimeUpdate);
//         video.addEventListener("loadedmetadata", handleLoadedMetadata);

//         return () => {
//             video.removeEventListener("timeupdate", handleTimeUpdate);
//             video.removeEventListener("loadedmetadata", handleLoadedMetadata);
//         };
//     }, [videoRef, setCurrentTime, setDuration]);


//     useEffect(() => {
//         const updateSubtitle = () => {
//             if (!videoRef.current) return;

//             const currentTime = videoRef.current.currentTime;
//             const activeSubtitle = subtitles.find(sub =>
//                 currentTime >= sub.start && currentTime <= sub.end
//             );

//             setCurrentSubtitle(activeSubtitle?.text || "");
//         };

//         const interval = setInterval(updateSubtitle, 100);
//         return () => clearInterval(interval);
//     }, [subtitles, videoRef]);

//     return (
//         <div ref={containerRef} className="p-4 flex flex-col justify-between h-full">
//             <div className="bg-primary p-4 flex flex-col justify-between h-full">
//                 {/* Video Container */}
//                 <div className="relative bg-secondary rounded-lg h-[90%] flex items-center justify-center">
//                     <video
//                         preload="auto"
//                         ref={videoRef}
//                         className="h-full rounded-lg"
//                         src={APIRoute.streamVideo + "/" + currentProject?.id}
//                     ></video>
//                     {currentSubtitle && (
//                         <div className={`absolute bottom-4 backdrop-blur text-white px-4 py-2 rounded-md text-sm text-center`} style={{ width: videoRef.current?.clientWidth }}>
//                             {currentSubtitle}
//                         </div>
//                     )}
//                 </div>
//                 {/* Controls */}
//                 <div className="flex justify-between items-center py-4 text-white">
//                     <div className="cursor-pointer" onClick={toggleMuted}>
//                         {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
//                     </div>
//                     <div className="cursor-pointer" onClick={togglePlayPause}>
//                         {playing ? <Pause size={24} /> : <Play size={24} />}
//                     </div>
//                     <div className="cursor-pointer" onClick={toggleFullscreen}>
//                         {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Player;





import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, FastForward, Volume2, Maximize, Minimize } from 'lucide-react';
import { useSubtitles } from '../../provider/subtitle_provider';
import APIRoute from '../../../api_route';
import { useEditorPageLogic } from '../controller/editor_logic';

interface PlayerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
}

const Player: React.FC<PlayerProps> = ({ videoRef, setCurrentTime, setDuration }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(80);
  const { subtitles } = useSubtitles();
  const [activeSubtitle, setActiveSubtitle] = React.useState<string>('');


  const { currentProject } = useEditorPageLogic();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for fullscreen container



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
    setIsFullscreen(!isFullscreen);

  };

  // Handle time updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);


      const currentSub = subtitles.find(
        sub => video.currentTime >= sub.start && video.currentTime <= sub.end
      );
      setActiveSubtitle(currentSub?.text || '');
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoRef, setCurrentTime, setDuration, subtitles]);

  // Handle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  // Skip forward/backward
  const skipTime = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  };

  return (
    <div className="h-full flex flex-col bg-black" ref={containerRef}>
      {/* Video container */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="max-h-full max-w-full"
          src={APIRoute.streamVideo + "/" + currentProject?.id} // Replace with your video source
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* Subtitle display */}
      <div className="relative">
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <div className="backdrop-blur-sm text-white p-2 rounded-md max-w-md text-center">
            {activeSubtitle}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-[#f3ebf6] border-t border-[#80419c] text-[#80419c]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => skipTime(-5)}
              className="p-2 rounded-full hover:bg-white border border-[#80419c]"
            >
              <FastForward style={{ transform: 'rotate(180deg)' }} size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-[#80419c] text-white hover:bg-[#6a3483]"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={() => skipTime(5)}
              className="p-2 rounded-full hover:bg-white border border-[#80419c]"
            >
              <FastForward size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <Volume2 size={20} />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />

            <div className="cursor-pointer" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;