import { userType } from "@/types/user.type";
import { create } from "zustand";

type UserStoreType = {
  userData: userType | null;
  setUserData: (userData: userType | null) => void;
  currentModel: string;
  setCurrentModel: (model: string) => void;
  currentService: "openrouter" | "gemini";
  setCurrentService: (service: "openrouter" | "gemini") => void;
};

const userStore = create<UserStoreType>((set) => ({
  userData: null,
  setUserData: (userData: userType | null) => set({ userData }),
  currentModel: "meta-llama/llama-3.1-405b-instruct",
  setCurrentModel: (model: string) => set({ currentModel: model }),
  currentService: "openrouter",
  setCurrentService: (service: "openrouter" | "gemini") => {
    const newModel =
      service === "openrouter"
        ? "meta-llama/llama-3.1-405b-instruct"
        : "google/gemini-2.5-flash";

    set({
      currentService: service,
      currentModel: newModel,
    });
  },
}));

export default userStore;
