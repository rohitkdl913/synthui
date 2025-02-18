import { useState, useEffect, useRef } from "react";
import { SubtitleEdit } from "./subtitle_edit";
import { Subtitle, useSubtitles } from "../../provider/subtitle_provider";
import { useProject } from "../../provider/project_provider";
import APIRoute from "../../../api_route";





const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};





const SidePanel: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState<Subtitle | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { subtitles } = useSubtitles();







  const handleAddSubtitle = () => {
    setSelectedSubtitle(null);
    setEditMode(true);
  };


  return (
    <aside className="w-64 flex-shrink-0 p-4 flex flex-col bg-gray-800 text-white overflow-y-scroll scrollbar-hide">
      {editMode ? (
        <SubtitleEdit
          //TODO: should be something else
          sub={selectedSubtitle}
          onClose={() => setEditMode(false)}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">Subtitles</span>
            <button
              onClick={() => {
                handleAddSubtitle()
              }}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              +
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : (
            <ul className="mt-4 space-y-2">

              {subtitles && subtitles.length > 0 ? subtitles.map((sub) => (
                <li
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubtitle(sub);
                    setEditMode(true);
                  }}
                  className="p-2 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  <span className=""> {sub.text}</span>
                  <div className="text-sm text-gray-400">
                    {formatTime(sub.start)} - {formatTime(sub.end)}
                  </div>
                </li>
              )) : <NoSubs />}
            </ul>
          )}
        </>
      )}
    </aside>
  );
};





const NoSubs = () => {
  return (
    <div>
      <h2>No Subs Available</h2>
      <br />
      <p>Start creating subs to add up here</p>
    </div>
  )
}


export default SidePanel;