import { useRef, useEffect, useState } from "react";
import { MdAdd, MdRemove, MdOutlineTextFields } from "react-icons/md";
import { useSubtitles, Subtitle } from "../../provider/subtitle_provider";

interface TimelineProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    currentTime: number;
    duration: number;
    onSubtitleSelect: (id: string) => void;
}



function secondsToTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return (
        <span>
            {hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
        </span>
    );
}

export default function Timeline({
    videoRef,
    currentTime,
    duration,

    onSubtitleSelect,
}: TimelineProps) {
    const [time2pixel, setTime2pixel] = useState(20);
    const cursorRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const { subtitles } = useSubtitles();


    // Update cursor position on time change
    useEffect(() => {
        if (cursorRef.current) {
            const cursorPosition = currentTime * time2pixel;
            cursorRef.current.style.left = `${cursorPosition}px`;
        }
    }, [currentTime, time2pixel]);


    // Automatic Cursor Scroller
    useEffect(() => {
        if (cursorRef.current) {
            if (timelineRef != null) {
                cursorRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
            }

        }
    }, [currentTime]);


    const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!timelineRef.current || !videoRef.current) return;
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const clickX = e.clientX - timelineRect.left;
        const scrollX = timelineRef.current.scrollLeft;
        const xRelativeToScroll = clickX + scrollX;
        const timeInSeconds = xRelativeToScroll / time2pixel;
        videoRef.current.currentTime = timeInSeconds;
    };

    return (
        <div className="p-4 border border-gray-700 h-full flex flex-col gap-2 bg-gray-900 text-white">
            {/* Top Controls */}
            <div className="flex justify-between items-center p-2 border border-gray-700 rounded-md">
                <div className="flex gap-4">

                </div>
                <div className="text-sm font-semibold">
                    {secondsToTime(currentTime)} / {secondsToTime(duration)}
                </div>
                <div className="flex gap-4">
                    <MdAdd
                        className="cursor-pointer hover:text-green-400"
                        onClick={() => setTime2pixel((prev) => Math.min(prev + 5, 50))}
                    />
                    <MdRemove
                        className="cursor-pointer hover:text-red-400"
                        onClick={() => setTime2pixel((prev) => Math.max(prev - 5, 15))}
                    />
                </div>
            </div>

            {/* Timeline Area */}
            <div
                className="relative h-full overflow-x-auto scrollbar-hide overflow-y-hidden"
                ref={timelineRef}
                onClick={handleTimelineClick}
            >


                {/* Playback Cursor */}
                <div
                    ref={cursorRef}
                    className="absolute top-0 bottom-0 w-[2px] bg-red-500 transition-all duration-100 "
                />

                {/* Time Markers */}
                <div className="relative flex h-8">
                    {Array.from({ length: Math.floor(duration) + 1 }, (_, index) => (
                        <TimeTick key={index} time={index} time2pixel={time2pixel} />
                    ))}
                </div>

                {/* Subtitles Track */}
                <div className="relative h-8">
                    {subtitles.map((sub) => (
                        <SubtitleView
                            key={sub.id}
                            subtitle={sub}
                            time2pixel={time2pixel}
                            onClick={() => onSubtitleSelect(sub.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const TimeTick = ({ time, time2pixel }: { time: number; time2pixel: number }) => {
    // console.log(`Time : ${time} Time2Pixel: ${time2pixel}`);
    return (

        <div
            className="absolute text-xs text-gray-400"
            style={{ left: time * time2pixel }}
        >


            {time % 5 === 0 ? (
                <div className="border-l border-white pl-1">{time}</div>
            ) : (
                <div className="border-l border-gray-600 h-4"></div>
            )}
        </div>
    )
}


const SubtitleView = ({
    subtitle,
    time2pixel,
    onClick,
}: {
    subtitle: Subtitle;
    time2pixel: number;
    onClick: () => void;
}) => {
    const width = (subtitle.end - subtitle.start) * time2pixel;
    return (
        <div
            className="absolute top-0 flex items-start gap-2 px-2 py-1 border-l-2 border-black text-sm bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400"
            onClick={onClick}
            style={{
                left: subtitle.start * time2pixel,
                width: width < 20 ? 20 : width,
                maxHeight: "24px",
                overflow: "hidden",
            }}
        >
            <MdOutlineTextFields className="mt-1" />
            <span className="truncate leading-tight">{subtitle.text}</span>
        </div>
    );
};
