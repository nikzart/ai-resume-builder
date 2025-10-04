import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CVData } from "@/types/cv";

interface CVStore {
  cvData: CVData | null;
  selectedTemplate: "classic" | "modern" | "minimal";
  setCvData: (data: CVData) => void;
  setTemplate: (template: "classic" | "modern" | "minimal") => void;
  clearCvData: () => void;
}

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      cvData: null,
      selectedTemplate: "classic",
      setCvData: (data) => set({ cvData: data }),
      setTemplate: (template) => set({ selectedTemplate: template }),
      clearCvData: () => set({ cvData: null }),
    }),
    {
      name: "cv-storage",
    }
  )
);
