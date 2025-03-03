export interface FeatureSectionProps {
    title: string;
    description: string;
    image: string;
    features: {
        number: string;
        title: string;
        description: string;
    }[];
}



const HowItWorks: React.FC<FeatureSectionProps> = ({
    title,
    description,
    image,
    features,
}) => {
    return (
        <div id="how-it-works" className="py-16 px-6 md:px-10 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="order-2 md:order-1">
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-blue-50 rounded-lg p-6">
                                    <div className="flex items-start">
                                        <div className="bg-(--primary-color) text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                            {feature.number}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <img
                            src={image}
                            alt="Process illustration"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;