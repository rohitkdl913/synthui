import logo from "../../../assets/icons/generative.png";
import Branding from "../../components/branding";
import Tooltip from "../../components/tool_tip";


interface HeadersProp {
    projectName: string,
    showExport: () => void;
    onGenerateWithAi: () => void;
}
const Headers: React.FC<HeadersProp> = ({ projectName, showExport, onGenerateWithAi }) => {
    return (
        <div className="p-2.5 flex items-center justify-between w-full bg-white">
            <Branding></Branding>
            <div className="flex items-center gap-[50px]">
                <span>{projectName}</span>
            </div>
            <div className="flex items-center gap-[40px]">
                <Tooltip text="Correct with AI" position="bottom">
                    <button onClick={onGenerateWithAi} className="cursor-pointer">
                        <img src={logo} width={50} height={50} />
                    </button>
                </Tooltip>

                <button className="px-5 py-2.5 border-none outline-none bg-black text-white rounded-[5px] hover:opacity-90 transition-opacity cursor-pointer" onClick={() => showExport()}>
                    Export
                </button>
            </div>
        </div>
    );
};

export default Headers;
