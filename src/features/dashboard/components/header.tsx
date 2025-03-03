import Avatar from "./user_avatar";

const Header = () => {
   

    return <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <Avatar></Avatar>
    </header>
}

export default Header;

