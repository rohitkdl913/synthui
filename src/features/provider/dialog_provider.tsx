import React, { createContext, useContext, useState, ReactNode } from "react";


interface DialogContextType {
  openDialog: (content: ReactNode) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}

interface DialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);

  const openDialog = (content: ReactNode) => {
    setDialogContent(content);
  };

  const closeDialog = () => {
    setDialogContent(null);
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialogContent}
    </DialogContext.Provider>
  );
}
