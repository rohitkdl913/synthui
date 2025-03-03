// import { createContext, useContext, useState, ReactNode } from 'react';

// export interface Subtitle {
//   id: string;
//   text: string;
//   start: number;
//   end: number;
//   alignment?: 'left' | 'center' | 'right';
//   fontSize?: number;
// }

// interface SubtitleContextType {
//   subtitles: Subtitle[];
//   addSubtitle: (subtitle: Subtitle) => void;
//   updateSubtitle: (id: string, updates: Subtitle) => void;
//   deleteSubtitle: (id: string) => void;
//   selectedSubtitle: Subtitle | null;
//   setSelectedSubtitle: (subtitle: Subtitle | null) => void;
// }

// const SubtitleContext = createContext<SubtitleContextType | undefined>(undefined);

// export const SubtitleProvider = ({ children }: { children: ReactNode }) => {
//   const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
//   const [selectedSubtitle, setSelectedSubtitle] = useState<Subtitle | null>(null);

//   const addSubtitle = (subtitle: Subtitle) => {
//     const newSubtitle = {
//       ...subtitle,
//       fontSize: subtitle.fontSize || 16,
//       alignment: subtitle.alignment || 'center'
//     };
//     setSubtitles(prev => [...prev, newSubtitle]);
//     setSelectedSubtitle(newSubtitle);
//   };

//   const updateSubtitle = (id: string, updates: Subtitle) => {
//     setSubtitles(prev => prev.map(sub =>
//       sub.id === id ? { ...updates } : sub
//     ));
//     if (selectedSubtitle?.id === id) {
//       setSelectedSubtitle(prev => prev ? { ...prev, ...updates } : null);
//     }
//   };

//   const deleteSubtitle = (id: string) => {
//     setSubtitles(prev => prev.filter(sub => sub.id !== id));
//     if (selectedSubtitle?.id === id) {
//       setSelectedSubtitle(null);
//     }
//   };

//   return (
//     <SubtitleContext.Provider
//       value={{
//         subtitles,
//         addSubtitle,
//         updateSubtitle,
//         deleteSubtitle,
//         selectedSubtitle,
//         setSelectedSubtitle
//       }}
//     >
//       {children}
//     </SubtitleContext.Provider>
//   );
// };

// export const useSubtitles = () => {
//   const context = useContext(SubtitleContext);
//   if (!context) {
//     throw new Error('useSubtitles must be used within a SubtitleProvider');
//   }
//   return context;
// };

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Subtitle {
  id: string;
  text: string;
  start: number;
  end: number;
  alignment?: 'left' | 'center' | 'right';
  fontSize?: number;
}

interface SubtitleContextType {
  subtitles: Subtitle[];
  addSubtitle: (subtitle: Subtitle) => void;
  updateSubtitle: (id: string, updates: Subtitle) => void;
  deleteSubtitle: (id: string) => void;
  selectedSubtitle: Subtitle | null;
  setSelectedSubtitle: (subtitle: Subtitle | null) => void;
  replaceSubtitle: (newSubtitles: Subtitle[]) => void;
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
    setSelectedSubtitle(newSubtitle);
  };

  const updateSubtitle = (id: string, updates: Subtitle) => {
    setSubtitles(prev => sortSubtitles(prev.map(sub =>
      sub.id === id ? { ...sub, ...updates } : sub
    )));
    if (selectedSubtitle?.id === id) {
      setSelectedSubtitle(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteSubtitle = (id: string) => {
    setSubtitles(prev => sortSubtitles(prev.filter(sub => sub.id !== id)));
    if (selectedSubtitle?.id === id) {
      setSelectedSubtitle(null);
    }
  };

  const replaceSubtitle = (newSubtitles: Subtitle[]) => {
    setSubtitles(sortSubtitles(newSubtitles));
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
        replaceSubtitle
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
