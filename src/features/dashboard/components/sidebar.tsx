import { Film, Settings } from "lucide-react"
import Branding from "../../components/branding";


const SideBar = () => {
   


    return <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 overflow-y-hidden">
        <div className="p-4 pb-6 border-b border-gray-200">
            <Branding></Branding>
        </div>

        <nav className="flex flex-col p-4 gap-2">
            <a href="#" className="flex items-center p-3 rounded-lg bg-[#f3ebf6] text-[#80419c] font-medium">
                <Film className="mr-3 h-5 w-5" />
                <span>Projects</span>
            </a>
        </nav>

        <div className="mt-auto p-4 border-t border-gray-200">
            {/* <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#80419c] flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                </div>
                <div className="ml-3">
                    <p className="font-medium text-gray-800">{user?.name|| "User not found"}</p>
                </div>
            </div> */}
            <a href="/dashboard/settings" className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <Settings className="mr-3 h-5 w-5" />
                <span>Settings</span>
            </a>
        </div>
    </div>
}


export default SideBar;