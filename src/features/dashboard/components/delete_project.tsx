import React from 'react';

interface DeleteProjectDialogProps {
  projectName: string;

  onClose: () => void;
  onConfirm: () => void;
}

const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({ projectName, onClose, onConfirm }) => {
  

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-gray-800">Delete Project</h2>
        <p className="text-gray-600 mt-2">Are you sure you want to delete the project <strong>{projectName}</strong>? This action cannot be undone.</p>
        
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
          <button onClick={()=>{onConfirm();onClose()}} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectDialog;
