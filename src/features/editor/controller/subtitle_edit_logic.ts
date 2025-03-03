import { useEffect, useRef, useState } from "react";
import { Subtitle, useSubtitles } from "../../provider/subtitle_provider";
import APIRoute from "../../../api_route";
import { useEditorPageLogic } from "../controller/editor_logic";

export const useSubtitleEditor = (sub: Subtitle | null, onClose: () => void) => {


  
  const { currentProject } = useEditorPageLogic();
  const { addSubtitle, updateSubtitle, deleteSubtitle } = useSubtitles();

  const [fontSize, setFontSize] = useState(16);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");

  const subtitleTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const subtitleStartTimeRef = useRef<HTMLInputElement>(null);
  const subtitleEndimeRef = useRef<HTMLInputElement>(null);
  const subtitleFontSelectorRef = useRef<HTMLSelectElement>(null);
  const subtitleFontWeightRef = useRef<HTMLSelectElement>(null);

  // It tracks if we are creating a new subtitle or not
  const isNew = sub == null;


  sub = sub ?? {
    id: Date.now().toString(),
    text: "New Subtitle",
    start: 0,
    end: 5
  };

  const onDelete = async () => {
    try {
      deleteSubtitle(sub.id);
      const response = await fetch(`${APIRoute.subtitle}/${sub.id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Delete failed");
    } catch (error) {
      addSubtitle(sub);
      console.error("Delete failed:", error);
    }

    onClose();
  };

  const onSave = async () => {
    const subtitle = {
      id: sub.id,
      start: parseInt(subtitleStartTimeRef.current?.value ?? "0") || 0,
      end: parseInt(subtitleEndimeRef.current?.value ?? "0") || 0,
      text: subtitleTextAreaRef.current?.value ?? "",
      language: "np"
    };

    try {
      if (isNew) {
        subtitle.id = currentProject?.id ?? "";
        const response = await fetch(`${APIRoute.subtitle}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subtitle)
        });

        if (!response.ok) throw new Error("Create failed");
        const createdSub = await response.json();

        addSubtitle({
          id: createdSub.id,
          text: createdSub.text,
          start: createdSub.start_time,
          end: createdSub.end_time,
          alignment: "center",
          fontSize: 16
        });
      } else {
        const response = await fetch(`${APIRoute.subtitle}/${sub.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subtitle)
        });

        if (!response.ok) throw new Error("Update failed");
        updateSubtitle(sub.id, { ...sub, ...subtitle });
      }
    } catch (error) {
      console.error("Operation failed:", error);
    }

    onClose();
  };

 

  return {
    fontSize,
    setFontSize,
    alignment,
    setAlignment,
    subtitleTextAreaRef,
    subtitleStartTimeRef,
    subtitleEndimeRef,
    subtitleFontSelectorRef,
    subtitleFontWeightRef,
    onSave,
    onDelete,
    isNew
  };
};
