interface HeadersProp{
    projectName:string,
    showExport: () => void;
}
const Headers:React.FC<HeadersProp> = ({projectName, showExport}) => {
    return (
        <div className="p-2.5 flex items-center justify-between w-full">
        <div className="text-xl font-semibold">
            SubtitleSynth<sup className="text-sm">AI</sup>
        </div>
        <div className="flex items-center gap-[50px]">
            <span>{projectName}</span>
        </div>
        <div>
            <button className="px-5 py-2.5 border-none outline-none bg-black text-white rounded-[5px] hover:opacity-90 transition-opacity" onClick={()=>showExport()}>
                Export
            </button>
        </div>
    </div>
    );
};

export default Headers;
