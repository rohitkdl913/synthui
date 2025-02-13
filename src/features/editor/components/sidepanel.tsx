import { useState, useEffect } from "react";
import { SubtitleEdit } from "./subtitle_edit";
import { Subtitle } from "../models/subtitle";



const formatTime = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return date.toISOString().substr(11, 8);
};

const SidePanel: React.FC = () => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubtitle, setSelectedSubtitle] = useState<Subtitle | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setSubtitles([]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleSaveSubtitle = (updatedSub: Subtitle) => {
    setSubtitles(prev =>
      prev.map(sub => sub.id === updatedSub.id ? updatedSub : sub)
    );
    setEditMode(false);
  };

  const handleAddSubtitle = () => {
    const newSub = {
      id: Date.now().toString(),
      text: "New Subtitle",
      start: 0,
      end: 5
    };
    setSubtitles(prev => [...prev, newSub]);
    setSelectedSubtitle(newSub);
    setEditMode(true);
  };

  const handleDeleteSubtitle = (id: string) => {
    setSubtitles(prev => prev.filter(sub => sub.id !== id));
    setEditMode(false);
  };

  return (
    <aside className="w-64 flex-shrink-0 p-4 flex flex-col bg-gray-800 text-white overflow-y-scroll scrollbar-hide">
      {editMode ? (
        <SubtitleEdit
          sub={selectedSubtitle ?? {
            id: Date.now().toString(),
            text: "New Subtitle",
            start: 0,
            end: 5
          }}
          onSave={(sub) => handleSaveSubtitle(sub)}
          onDelete={() => {
            handleDeleteSubtitle(selectedSubtitle!.id);
            setEditMode(false);
          }}
          onClose={() => setEditMode(false)}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">Subtitles</span>
            <button
              onClick={handleAddSubtitle}
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
                  {sub.text}
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