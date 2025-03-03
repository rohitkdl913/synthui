import { AlignCenter, AlignLeft, AlignRight, X } from "lucide-react";
import { useSubtitles } from "../../provider/subtitle_provider";
import { useSubtitleEditor } from "../controller/subtitle_edit_logic";
import { useProject } from "../../provider/project_provider";
import { useEditorPageLogic } from "../controller/editor_logic";
import APIRoute from "../../../api_route";
import { useRef, useState } from "react";

interface SubtitleEditProps {
  onClose: () => void;
}

export const SubtitleEdit: React.FC<SubtitleEditProps> = ({ onClose }) => {

  const { selectedSubtitle } = useSubtitles();
  const { currentProject } = useEditorPageLogic();

  let sub = selectedSubtitle;

  //It track that we are creating new subtitle or not 
  const isNew: boolean = sub == null;




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
      const response = await fetch(`${APIRoute.subtitle}/${sub.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Delete failed');
    } catch (error) {
      addSubtitle(sub);
      console.error('Delete failed:', error);
    }

    onClose();
  };

  const onSave = async () => {
    const subtitle = {
      id: sub.id,
      start: Number(subtitleStartTimeRef.current?.value) || 0,
      end: Number(subtitleEndimeRef.current?.value) || 0,
      text: subtitleTextAreaRef.current?.value ?? "",
      language: "np"
    };

    console.log(`Saved data is ${JSON.stringify(subtitle)}`)

    try {
      if (isNew) {
        // Create new subtitle
        subtitle.id = currentProject?.id ?? "";
        const response = await fetch(`${APIRoute.subtitle}`, {
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
        const response = await fetch(`${APIRoute.subtitle}/${sub.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subtitle)
        });

        if (!response.ok) throw new Error('Update failed');
        updateSubtitle(sub.id, { ...sub, ...subtitle });
      }
    } catch (error) {
      console.error('Operation failed:', error);
      // Add error handling logic here
    }
    onClose();
  };




  // const [fontSize, setFontSize] = useState(16);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");

  const subtitleTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const subtitleStartTimeRef = useRef<HTMLInputElement>(null);
  const subtitleEndimeRef = useRef<HTMLInputElement>(null);
  // const subtitleFontSelectorRef = useRef<HTMLSelectElement>(null);
  // const subtitleFontWeightRef = useRef<HTMLSelectElement>(null);


  const { addSubtitle, updateSubtitle, deleteSubtitle } = useSubtitles();

  return (
    <div className="w-full bg-white text-gray-900 scrollbar-hide p-4">
      <div className="flex items-center justify-between border-b border-gray-300">
        <h3 className="text-lg font-semibold text-[var(--primary-color)]">Edit Subtitle</h3>
        <button
          onClick={onClose}
          className="p-1 hover:text-[var(--primary-hover)] rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="border-b border-gray-300 py-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Alignment</span>
          <div className="flex gap-2">
            <button
              className={`p-2 rounded ${alignment === "left" ? "bg-[var(--primary-light)]" : "hover:bg-[var(--primary-light)]"}`}
              onClick={() => setAlignment("left")}
            >
              <AlignLeft className="w-5 h-5" />
            </button>
            <button
              className={`p-2 rounded ${alignment === "center" ? "bg-[var(--primary-light)]" : "hover:bg-[var(--primary-light)]"}`}
              onClick={() => setAlignment("center")}
            >
              <AlignCenter className="w-5 h-5" />
            </button>
            <button
              className={`p-2 rounded ${alignment === "right" ? "bg-[var(--primary-light)]" : "hover:bg-[var(--primary-light)]"}`}
              onClick={() => setAlignment("right")}
            >
              <AlignRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <textarea
        ref={subtitleTextAreaRef}
        name="content"
        placeholder="Subtitle text"
        defaultValue={sub.text}
        className="w-full p-2 bg-[var(--primary-light)] rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none resize-none"
        rows={4}
      />

      {/* Time controls */}
      <div className="py-2">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm mb-2">Start Time (s)</label>
            <input
              ref={subtitleStartTimeRef}
              type="number"
              name="startTime"
              defaultValue={sub.start}
              step="1"
              className="w-full p-2 bg-[var(--primary-light)] rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-2">End Time (s)</label>
            <input
              ref={subtitleEndimeRef}
              type="number"
              name="endTime"
              defaultValue={sub.end}
              step="1"
              className="w-full p-2 bg-[var(--primary-light)] rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <button
        className="w-full py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white rounded-md transition-colors mt-5"
        onClick={onSave}
      >
        {isNew ? "Save" : "Update"}
      </button>

      {!isNew && (
        <div className="mt-6">
          <button
            onClick={onDelete}
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors text-white"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SubtitleEdit;