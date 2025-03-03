import { useEffect, useRef, useState } from "react";
import { MdAdd, MdAlignHorizontalCenter, MdAlignHorizontalLeft, MdAlignHorizontalRight, MdClose, MdRemove } from "react-icons/md";
import { Subtitle, useSubtitles } from "../../provider/subtitle_provider";
import APIRoute from "../../../api_route";
import { useProject } from "../../provider/project_provider";

interface SubtitleEditProps {
  onClose: () => void;
}

export const SubtitleEdit: React.FC<SubtitleEditProps> = ({ onClose }) => {

  const { selectedSubtitle } = useSubtitles();
  const { project } = useProject();

  let sub = selectedSubtitle;

  //It track that we are creating new subtitle or not 
  const isNew: boolean = sub == null;


  // Refs for API action stack and timeout
  const apiStack = useRef<Array<{ type: 'add' | 'update' | 'delete'; data: Subtitle }>>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);



  sub = sub ?? {
    id: Date.now().toString(),
    text: "New Subtitle",
    start: 0,
    end: 5
  };

  const onDelete = async () => {
    try {
      // Optimistic UI update
      deleteSubtitle(sub.id);

      // API call
      const response = await fetch(`${APIRoute.addSubtitle}/${sub.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Delete failed');
    } catch (error) {
      // Revert on error
      addSubtitle(sub);
      console.error('Delete failed:', error);
    }

    onClose();
  };

  const onSave = async () => {
    const subtitle = {
      id: sub.id,
      start:parseInt(subtitleStartTimeRef.current?.value ?? "0") || 0,
      end: parseInt(subtitleEndimeRef.current?.value ?? "0") || 0,
      text: subtitleTextAreaRef.current?.value ?? "",
      language: "np"
    };

    console.log(`Saved data is ${JSON.stringify(subtitle)}`)

    try {
      if (isNew) {
        // Create new subtitle
        subtitle.id = project?.projectId ?? "";
        const response = await fetch(`${APIRoute.addSubtitle}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subtitle)
        });

        if (!response.ok) throw new Error('Create failed');
        const createdSub = await response.json();

        // Update with server-generated ID
        addSubtitle({
          id: createdSub.id, // Assuming `id` is not provided, using index as fallback
          text: createdSub.text,
          start: createdSub.start_time,
          end: createdSub.end_time,
          alignment: 'center',
          fontSize: 16
        });
      } else {
        // Update existing subtitle
        const response = await fetch(`${APIRoute.addSubtitle}/${sub.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subtitle)
        });
        console.log(`Updated data is ${JSON.stringify(subtitle)}`)
        if (!response.ok) throw new Error('Update failed');
        updateSubtitle(sub.id, { ...sub, ...subtitle });
      }
    } catch (error) {
      console.error('Operation failed:', error);
      // Add error handling logic here
    }
    onClose();
  };

  // Clear pending timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);


  const [fontSize, setFontSize] = useState(16);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");

  const subtitleTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const subtitleStartTimeRef = useRef<HTMLInputElement>(null);
  const subtitleEndimeRef = useRef<HTMLInputElement>(null);
  const subtitleFontSelectorRef = useRef<HTMLSelectElement>(null);
  const subtitleFontWeightRef = useRef<HTMLSelectElement>(null);


  const { addSubtitle, updateSubtitle, deleteSubtitle } = useSubtitles();




  return <div className="w-full   shadow-lg text-gray-100 overflow-y-scroll scrollbar-hide">
    {/* Header with back button */}
    <div className="flex items-center justify-between  border-b border-gray-700">
      <h3 className="text-lg font-semibold">Edit Subtitle</h3>
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-700 rounded transition-colors"
      >
        <MdClose className="w-5 h-5" />
      </button>
    </div>

    {/* Alignment Controls */}
    <div className=" border-b border-gray-700 py-2">
      <div className="flex items-center justify-between">
        <span className="text-sm">Alignment</span>
        <div className="flex gap-2">
          <button className={`p-2 rounded ${alignment === "left" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => setAlignment("left")}>
            <MdAlignHorizontalLeft className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded ${alignment === "center" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => setAlignment("center")}>
            <MdAlignHorizontalCenter className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded ${alignment === "right" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => setAlignment("right")}>
            <MdAlignHorizontalRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>




    {/* Time Controls */}
    <div className=" border-b border-gray-700 py-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-2">Start Time (s)</label>
          <input
            ref={subtitleStartTimeRef}
            type="number"
            name="startTime"
            defaultValue={sub.start}
            step="1"
            className="w-full p-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">End Time (s)</label>
          <input
            ref={subtitleEndimeRef}
            type="number"
            name="endTime"
            defaultValue={sub.end}
            step="1"
            className="w-full p-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>

    {/* Text Editor Form */}
    <textarea
      ref={subtitleTextAreaRef}
      name="content"
      placeholder="Subtitle text"
      defaultValue={sub.text}
      className="w-full p-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
      rows={4}
    />

    <div className="grid grid-cols-2 gap-4 py-2">
      <select
        ref={subtitleFontSelectorRef}
        name="font"
        className="p-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="RedditSans">RedditSans</option>
      </select>

      <select
        ref={subtitleFontWeightRef}
        name="fontweight"
        className="p-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>

    <div className="flex items-center justify-between bg-gray-700 p-2 rounded-md mb-4">
      <span className="text-sm">Size</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFontSize(prev => Math.max(8, prev - 1))}
          className="p-1 hover:bg-gray-600 rounded"
        >
          <MdRemove className="w-4 h-4" />
        </button>
        <span className="px-2">{fontSize}</span>
        <button
          type="button"
          onClick={() => setFontSize(prev => Math.min(72, prev + 1))}
          className="p-1 hover:bg-gray-600 rounded"
        >
          <MdAdd className="w-4 h-4" />
        </button>
      </div>
    </div>

    <button
      className="w-full py-2  bg-blue-600 hover:bg-blue-700 rounded-md transition-colors" onClick={() => onSave()}
    >
      {isNew ? "Save" : "Update"}
    </button>


    {!isNew && <div className="mt-6">
      <button
        onClick={onDelete}
        className="w-full py-2  bg-red-600 hover:bg-red-700 rounded-md transition-colors"
      >
        Delete
      </button>
    </div>}
  </div>


};