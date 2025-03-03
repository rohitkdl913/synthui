export interface HeroSectionProps {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    onButtonClick: () => void;
    heroImage: string;
}




const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    subtitle,
    description,
    buttonText,
    onButtonClick,
    heroImage,
}) => {
    return (
        <div id="home" className="py-16 px-6 md:px-10 bg-gray-100">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {title} <span className="text-(--primary-color)">{subtitle}</span>
                    </h1>
                    <p className="text-gray-600 mb-8 max-w-lg">{description}</p>
                    <a
                        href="#get-started"
                        className="bg-(--primary-color) hover:bg-(--primary-hover) text-white font-medium py-3 px-6 rounded-md mb-8 inline-block"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </a>
                </div>
                <div className="relative">
                    <img
                        src={heroImage}
                        alt="Hero image"
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;