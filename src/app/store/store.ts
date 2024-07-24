import { create } from "zustand";
import { Locale } from "../shared/types";

interface State {
  languageMode: Locale;
}

interface Actions {
  setLanguageMode: (mode: Locale) => void;
}

export const useStore = create<State & Actions>()((set) => ({
  languageMode: "es",
  setLanguageMode: (mode) => set(() => ({ languageMode: mode })),
}));
