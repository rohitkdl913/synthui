import { useState } from "react";
import { Subtitle } from "../models/subtitle";
import { MdAdd, MdAlignHorizontalCenter, MdAlignHorizontalLeft, MdAlignHorizontalRight, MdClose, MdRemove } from "react-icons/md";




interface SubtitleEditProps {
  sub: Subtitle;
  onSave: (sub: Subtitle) => void;
  onDelete: () => void;
  onClose: () => void;
}

export const SubtitleEdit: React.FC<SubtitleEditProps> = ({ sub, onSave, onDelete, onClose }) => {
  const [formState, setFormState] = useState(sub);
  const [fontSize, setFontSize] = useState(16);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

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
          <button className="p-2 hover:bg-gray-700 rounded">
            <MdAlignHorizontalLeft className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <MdAlignHorizontalCenter className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
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
      name="content"
      placeholder="Subtitle text"
      defaultValue={sub.text}
      className="w-full p-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
      rows={4}
    />

    <div className="grid grid-cols-2 gap-4 py-2">
      <select
        name="font"
        className="p-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="RedditSans">RedditSans</option>
      </select>

      <select
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
      type="submit"
      className="w-full py-2  bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
    >
      Update
    </button>


    <div className="mt-6">
      <button
        onClick={onDelete}
        className="w-full py-2  bg-red-600 hover:bg-red-700 rounded-md transition-colors"
      >
        Delete
      </button>
    </div>
  </div>


};