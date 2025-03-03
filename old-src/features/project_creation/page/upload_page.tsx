//@depreciated dont use this page 



import React, { useRef, useState } from 'react';
import logo from "../../../assets/logo/logo.png";
import ProjectCreationDialog from '../components/project_creation_dialog';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setShowModal(true);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setShowModal(true);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center p-6">
      <img src={logo} alt="Logo" className="h-12 fixed left-0  top-0" />
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 text-center w-1/2 h-3/4 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="video/*"
          onChange={handleFileChange}
        />
        <p className="text-gray-500">Drop the file here or click to upload</p>
        {file && <p className="mt-2 text-blue-500">{file.name}</p>}
      </div>

      {/* Modal for Project Creation */}
      {showModal && (
        <ProjectCreationDialog onClose={() => setShowModal(false)} fileName={file?.name ?? ""} file={file} fileSize={file?.size}></ProjectCreationDialog>
      )}
    </div>
  );
};

export default UploadPage;