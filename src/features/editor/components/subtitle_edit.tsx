import { useEffect, useRef, useState } from "react";
import { MdAdd, MdAlignHorizontalCenter, MdAlignHorizontalLeft, MdAlignHorizontalRight, MdClose, MdRemove } from "react-icons/md";
import { Subtitle, useSubtitles } from "../../provider/subtitle_provider";

interface SubtitleEditProps {
  sub: Subtitle | null;
  onClose: () => void;
}

export const SubtitleEdit: React.FC<SubtitleEditProps> = ({ sub, onClose }) => {

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

  // Process API stack
  const processApiStack = () => {
    const actions = apiStack.current;
    apiStack.current = [];
    // Simulate API calls (replace with actual API requests)
    actions.forEach(action => {
      console.log(`API call: ${action.type}`, action.data);

      switch (action.type) {
        case 'add':
          fetch('/subtitle/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              project_id: action.data.id,
              language: "nepali",
              start_time: action.data.start,
              end_time: action.data.end,
              text: action.data.text
            })
          })
            .then(response => {
              if (!response.ok) throw new Error('Create failed');
              return response.json();
            })
            .then(createdSub => {
              // Update frontend ID with backend-generated ID if needed
              updateSubtitle(action.data.id, { ...action.data, id: createdSub.id });
            });
          break;

        case 'update':
          fetch(`/subtitle/${action.data.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: action.data.text,
              start_time: action.data.start,
              end_time: action.data.end
            })
          });
          break;

        case 'delete':
          fetch(`/subtitle/${action.data.id}`, {
            method: 'DELETE'
          });
          break;
      }

    });
  };

  // Schedule API processing with debounce
  const scheduleApiProcessing = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(processApiStack, 2000); // Batch after 2 seconds
  };

  const onDelete = () => {
    deleteSubtitle(sub.id); // Optimistic UI update
    apiStack.current.push({ type: 'delete', data: sub });
    scheduleApiProcessing();
    onClose();
  };

  const onSave = () => {
    const subtitle: Subtitle = {
      id: sub.id,
      text: subtitleTextAreaRef.current?.value ?? "",
      start: Number(subtitleStartTimeRef.current?.value) || 0,
      end: Number(subtitleEndimeRef.current?.value) || 0
    };

    if (isNew) {
      addSubtitle(subtitle);
      apiStack.current.push({ type: 'add', data: subtitle });
    } else {
      updateSubtitle(sub.id, subtitle);
      apiStack.current.push({ type: 'update', data: subtitle });
    }

    scheduleApiProcessing();
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




  return <div className="w-full bg-gray-800  shadow-lg text-gray-100 overflow-y-scroll scrollbar-hide">
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
            step="0.1"
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
            step="0.1"
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