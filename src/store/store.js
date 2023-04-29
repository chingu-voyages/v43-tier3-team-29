import { create } from "zustand";

const store = (set) => ({
  // Sound
  soundLevel: 1,
  updateSoundLevel: (newValue) => set(() => ({ soundLevel: newValue })),
  soundControlIsVisible: false,
  toggleSoundControlVisibility: () =>
    set((state) => ({ soundControlIsVisible: !state.soundControlIsVisible })),

  // Cursor
  cursorType: "pointer",
  updateCursorType: (newValue) => set(() => ({ cursorType: newValue })),

  // Active nav btn
  activeNav: "about",
  updateActiveNav: (newValue) => set(() => ({ activeNav: newValue })),
});

export const useStore = create(store);
