import { useEffect, useState } from "react";
// import { useProject } from "../../provider/project_provider";
import { useSubtitles } from "../../provider/subtitle_provider";
import { useNavigate, useParams } from "react-router-dom";
import APIRoute from "../../../api_route";
import { Project } from "../../model/project";

export const useEditorPageLogic = () => {
    // const { projects } = useProject();
    const [loading, setLoading] = useState(true);
    const [ailoading, setAILoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { replaceSubtitles } = useSubtitles();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [message, setMessage] = useState<string | null>(null);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);




    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`${APIRoute.projectStatus}/${id}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                if (!data.data.status && data.data.translationType !== "REALTIME") {
                    setMessage("Redirecting to home...");
                    navigate("/");
                    return;
                }



                if (data.data.subtitle) {
                    const formattedSubtitles = data.data.subtitle.map((sub: any) => ({
                        id: sub.id,
                        text: sub.text,
                        start: sub.start_time,
                        end: sub.end_time,
                        alignment: "center",
                        fontSize: 16,
                    }));

                    replaceSubtitles(formattedSubtitles);

                    const formattedProject = {
                        id: data.data.id,
                        name: data.data.name,

                        translationType: data.data.translationType,
                        status: data.data.status,
                        thumbnail: `${APIRoute.streamThumbnail}/${data.data.id}`,
                        //TODO:
                        updatedAt: "",
                        createdAt: "",
                        duration: ""
                    };
                    setCurrentProject(formattedProject);

                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load project");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProjectData();
    }, [id]);

    const onGenerateWithAi = async () => {
        try {
            setAILoading(true);
            setError(null);
            const response = await fetch(`${APIRoute.generateWithAI}/${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            if (data.data) {
                const formattedSubtitles = data.data.subtitle.map((sub: any) => ({
                    id: sub.id,
                    text: sub.text,
                    start: sub.start_time,
                    end: sub.end_time,
                    alignment: "center",
                    fontSize: 16,
                }));
                replaceSubtitles(formattedSubtitles)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load project");
        } finally {
            setAILoading(false);
        }
    };


    return { loading, ailoading, error, currentProject, message, onGenerateWithAi };
};
