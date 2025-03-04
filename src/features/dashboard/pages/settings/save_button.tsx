
import { ReactNode } from "react";

const SaveButton = ({children,onClick}: {children: ReactNode, onClick: () => void }) => {
    return <div className="flex flex-row-reverse pt-10">
        <button
            onClick={onClick}
            className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-hover)]">
            {children}
        </button>
    </div>
}

export default SaveButton;



