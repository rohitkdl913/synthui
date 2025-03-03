export interface CtaSectionProps {
    title: string;
    buttonPrimaryText: string;
    image: string;
}


const CtaSection: React.FC<CtaSectionProps> = ({
    title,
    buttonPrimaryText,
    image,
}) => {
    return (
        <div id="get-started" className="py-16 px-6 md:px-10 bg-blue-50">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">{title}</h2>
                    <a
                        href="/login"
                        className="bg-(--primary-color) hover:bg-(--primary-hover) text-white font-medium py-3 px-6 rounded-md inline-block"
                    >
                        {buttonPrimaryText}
                    </a>
                </div>
                <div className="flex justify-center">
                    <img
                        src={image}
                        alt="CTA illustration"
                        className="rounded-lg shadow-lg max-w-sm"
                    />
                </div>
            </div>
        </div>
    );
};
export default CtaSection;