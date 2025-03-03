import logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";


const Branding = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/");
    }
    return <div className="flex items-end justify-center cursor-pointer" onClick={onClick}>
        <img src={logo} alt="Logo" className="h-8 w-8 mr-5" />
        <div className="text-xl font-semibold">
            SubtitleSynth<sup className="text-lg">AI</sup>
        </div>

    </div>
}

export default Branding;