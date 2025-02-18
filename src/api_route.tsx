
const apiUrl = import.meta.env.VITE_TRANSLATION_SERVER_URL;

class APIRoute {
    static CreateaProject=apiUrl + "/create-project";
    static VideoStream= apiUrl+"/stream/video"
    static ThumbnailStream= apiUrl+"/stream/thumbnail"

    static project= apiUrl+"/project"
    static projectStatus= apiUrl+"/project/status"
    static projectStream= apiUrl+"/project/stream"


    static exportSubtitle= apiUrl+"/export/subtitle"


    static deleteProject=apiUrl+"/delete/project"
}

export default  APIRoute;