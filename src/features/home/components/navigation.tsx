import Branding from "../../components/branding";

const Navigation: React.FC<{
    navItems: { name: string; href: string }[];
}> = ({ navItems }) => {
    return (
        <nav className="flex items-center justify-between py-4 px-6 md:px-10 sticky top-0 bg-white z-10 shadow-sm">
            <div className="flex items-center">
                <Branding></Branding>
            </div>
            <div className="flex gap-5">
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

            </div>
        </nav>
    );
};


export default Navigation;