import { createContext, useContext, useState, ReactNode } from 'react';

export interface Subtitle {
  id: string;
  text: string;
  start: number;
  end: number;
  alignment?: 'left' | 'center' | 'right';
  fontSize?: number;
}

interface ServerSubtitle {
  id: number;
  text: string;
  start_time: number;
  end_time: number;
  created_at: string;
  updated_at: string;
  project_id: string;
  language: string;
}

interface SubtitleContextType {
  subtitles: Subtitle[];
  addSubtitle: (subtitle: Subtitle) => void;
  updateSubtitle: (id: string, updates: Subtitle) => void;
  deleteSubtitle: (id: string) => void;
  selectedSubtitle: Subtitle | null;
  setSelectedSubtitle: (subtitle: Subtitle | null) => void;
  replaceSubtitles: (newSubtitles: Subtitle[]) => void;
  importSubtitles: (serverSubtitles: ServerSubtitle[]) => void;


}

const SubtitleContext = createContext<SubtitleContextType | undefined>(undefined);

export const SubtitleProvider = ({ children }: { children: ReactNode }) => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [selectedSubtitle, setSelectedSubtitle] = useState<Subtitle | null>(null);

  const sortSubtitles = (subs: Subtitle[]) => 
    subs.sort((a, b) => a.start === b.start ? a.end - b.end : a.start - b.start);

  const addSubtitle = (subtitle: Subtitle) => {
    const newSubtitle = {
      ...subtitle,
      fontSize: subtitle.fontSize || 16,
      alignment: subtitle.alignment || 'center'
    };
    setSubtitles(prev => sortSubtitles([...prev, newSubtitle]));
    console.log("Selected subtitle changed by ADD:", selectedSubtitle);
    setSelectedSubtitle(newSubtitle);
  };

  const updateSubtitle = (id: string, updates: Subtitle) => {
    setSubtitles(prev => sortSubtitles(prev.map(sub =>
      sub.id === id ? { ...sub, ...updates } : sub
    )));
    if (selectedSubtitle?.id === id) {
    console.log("Selected subtitle changed by UPDATE:", selectedSubtitle);

      setSelectedSubtitle(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteSubtitle = (id: string) => {
    setSubtitles(prev => sortSubtitles(prev.filter(sub => sub.id !== id)));
    if (selectedSubtitle?.id === id) {
    console.log("Selected subtitle changed by DELETE:", selectedSubtitle);

      setSelectedSubtitle(null);
    }
  };


  const replaceSubtitles = (newSubtitles: Subtitle[]) => {
    setSubtitles(sortSubtitles(newSubtitles));
  };
  const importSubtitles = (serverSubtitles: ServerSubtitle[]) => {
    const mappedSubtitles:Subtitle[] = serverSubtitles.map((sub) => ({
      id: sub.id.toString(),
      text: sub.text,
      start: sub.start_time,
      end: sub.end_time,
      fontSize: 16,
      alignment: 'center',
    }));
    replaceSubtitles(mappedSubtitles);
  };

  return (
    <SubtitleContext.Provider
      value={{
        subtitles,
        addSubtitle,
        updateSubtitle,
        deleteSubtitle,
        selectedSubtitle,
        setSelectedSubtitle,
        replaceSubtitles,
        importSubtitles
      }}
    >
      {children}
    </SubtitleContext.Provider>
  );
};

export const useSubtitles = () => {
  const context = useContext(SubtitleContext);
  if (!context) {
    throw new Error('useSubtitles must be used within a SubtitleProvider');
  }
  return context;
};