
const apiUrl = import.meta.env.VITE_TRANSLATION_SERVER_URL;

class APIRoute {
    static createProject = apiUrl + "/create-project";
    static deleteProject = apiUrl + "/delete/project"

    static streamVideo = apiUrl + "/stream/video"
    static streamThumbnail = apiUrl + "/stream/thumbnail"

    static project = apiUrl + "/project"
    static projectStatus = apiUrl + "/project/status"
    static projectStream = apiUrl + "/project/stream"


    static exportSubtitle = apiUrl + "/export/subtitle"

    static subtitle = apiUrl + "/subtitle"
    static generateWithAI = apiUrl + "/ai";

    static auth = apiUrl + "/auth";
    static login = this.auth + "/login";
    static signup = this.auth + "/signup"
    static user= this.auth + "/user"
    static logout = this.auth + "/logout"
}

export default APIRoute;