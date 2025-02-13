
const apiUrl = import.meta.env.VITE_TRANSLATION_SERVER_URL;

class APIRoute {
    static CreateaProject=apiUrl + "/create-project";
    static VideoStream= apiUrl+"/stream/video"
}

export default  APIRoute;