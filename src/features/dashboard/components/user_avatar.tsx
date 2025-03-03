import { User } from "lucide-react";
import { useDialog } from "../../provider/dialog_provider";
import { useAuth } from "../../provider/auth_provider";
import { useState } from "react";
import APIRoute from "../../../api_route";
import { useNavigate } from "react-router-dom";

const Avatar = () => {
    const { openDialog, closeDialog } = useDialog();
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const navigate=useNavigate();


    const handleLogout = async () => {
        try {
            await fetch(`${APIRoute.logout}`, { method: 'POST', credentials: 'include' });
            navigate("/login");
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <div className="relative">
            <div
                className="flex items-center cursor-pointer"
                onClick={toggleMenu} 
            >
                <div className="w-10 h-10 rounded-full bg-[#80419c] flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                </div>
                <div className="ml-3">
                    <p className="font-medium text-gray-800">{user?.name || "User not found"}</p>
                </div>
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <ul>
                        <li
                            className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                                openDialog(<LogoutDialog cancel={closeDialog} handleLogout={handleLogout} />);
                                setIsMenuOpen(false); // Close the menu after selecting an option
                            }}
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

const LogoutDialog = ({ cancel, handleLogout }: { cancel: () => void; handleLogout: () => void }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-medium mb-4">Are you sure you want to logout?</h2>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => cancel()}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={()=>{handleLogout();cancel()}}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
