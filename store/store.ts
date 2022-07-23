import create from "zustand";

interface AppState {
  isSignedIn: boolean;
  setSignIn: (isSignedIn: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  isSignedIn: false,
  setSignIn: (isSignedIn: boolean) => set({ isSignedIn }),
}));
