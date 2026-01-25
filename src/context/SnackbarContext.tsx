import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Snackbar, type SnackbarType } from "../components/Snackbar/Snackbar";


type SnackbarState = {
  open: boolean;
  message: string;
  type: SnackbarType;
};

type SnackbarContextValue = {
  show: (message: string, type?: SnackbarType) => void;
  close: () => void;
};

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snack, setSnack] = useState<SnackbarState>({
    open: false,
    message: "",
    type: "info",
  });

  const close = useCallback(() => {
    setSnack((s) => ({ ...s, open: false }));
  }, []);

  const show = useCallback((message: string, type: SnackbarType = "info") => {
    setSnack({ open: true, message, type });
  }, []);

  const value = useMemo(() => ({ show, close }), [show, close]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar open={snack.open} message={snack.message} type={snack.type} onClose={close} />
    </SnackbarContext.Provider>
  );
}

export function useAppSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useAppSnackbar must be used within SnackbarProvider");
  return ctx;
}
