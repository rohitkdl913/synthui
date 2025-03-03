import { ReactNode } from "react";

const SaveButton = ({children,onClick}: {children: ReactNode, onClick: () => void }) => {
    return <div className="absolute bottom-4 right-4">
        <button
            onClick={onClick}
            className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-hover)]">
            Save
        </button>
    </div>
}

export default SaveButton;


