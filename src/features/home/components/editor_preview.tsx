const EditorPreview: React.FC<{
    title: string;
    description: string;
    image: string;
}> = ({ title, description, image }) => {
    return (
        <div id="features" className="py-16 px-6 md:px-10 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
                </div>
                <div className="flex justify-center">
                    <img
                        src={image}
                        alt="Editor preview"
                        className="rounded-lg shadow-xl w-full max-w-4xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditorPreview;