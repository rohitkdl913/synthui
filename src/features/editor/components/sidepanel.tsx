import { useState, useEffect, useRef } from "react";
import { SubtitleEdit } from "./subtitle_edit";
import { Subtitle, useSubtitles } from "../../provider/subtitle_provider";
import { Plus } from 'lucide-react';


const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};





const SidePanel: React.FC = () => {

  const [loading, _] = useState<boolean>(false);

  const [editMode, setEditMode] = useState<boolean>(false);
  const { subtitles, setSelectedSubtitle, selectedSubtitle } = useSubtitles();


  const handleAddSubtitle = () => {
    console.log("Selected subtitle changed by ADD:", selectedSubtitle);

    setSelectedSubtitle(null);
    setEditMode(true);
  };

  const handleEditSubtitle = (sub: Subtitle) => {
    console.log("Selected subtitle changed by EDIT:", selectedSubtitle);

    setSelectedSubtitle(sub);
    setEditMode(true);
  };

  useEffect(() => {
    console.log("Selected subtitle changed by LOADING:", selectedSubtitle);
  }, [selectedSubtitle]);

  return (
    <aside className=" flex flex-col border-b border-gray-200 overflow-y-scroll flex-2">
      {editMode || selectedSubtitle ? (
        <SubtitleEdit
          key={selectedSubtitle?.id} // Force re-render when subtitle changes
          onClose={() => {
            console.log("Selected subtitle changed by ONCLOSE:", selectedSubtitle);
            setEditMode(false);
            setSelectedSubtitle(null)
          }}
        />
      ) : (
        <>
          <div className="p-3 border-b border-gray-200 flex  items-center justify-between">
            <span className="text-lg font-bold">Subtitles</span>
            <button
              onClick={handleAddSubtitle}
              className="bg-[var(--primary-color)] text-white rounded-full p-1 hover:bg-[var(--primary-hover)] transition-colors"
            >
              <Plus></Plus>
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : (
            <ul className="mt-4 space-y-2 p-2">

              {subtitles && subtitles.length > 0 ? subtitles.map((sub) => (
                <li
                  key={sub.id}
                  className="border-b border-gray-200 py-2 cursor-pointer hover:bg-[var(--primary-light)] transition-colors"
                  onClick={() => {
                    handleEditSubtitle(sub);
                  }}
                >
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis"> {sub.text}</p>
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
