
export interface AboutSectionProps {
    title: string;
    description: string[];
    technologies: {
        name: string;
        description: string;
        icon?: string;
    }[];
    image: string;
}


const AboutSection: React.FC<AboutSectionProps> = ({
    title,
    description,
    technologies,
    image,
}) => {
    return (
        <div id="about" className="py-16 px-6 md:px-10 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
                    {description.map((paragraph, idx) => (
                        <p key={idx} className="text-gray-600 max-w-3xl mx-auto mb-4">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src={image}
                            alt="Technical architecture"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-6">Technologies Used</h3>
                        <div className="space-y-6">
                            {technologies.map((tech, index) => (
                                <div key={index} className="flex">
                                    <div>
                                        <h4 className="font-medium text-lg">{tech.name}</h4>
                                        <p className="text-gray-600">{tech.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;