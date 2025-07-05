
import { create } from "zustand";

type ChatStoreType = {
   query: string;
   setQuery: (query: string) => void;
   messages: any;
   setMessages: (messages: any) => void;
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
   isRegenerate: boolean;
   setIsRegenerate: (isRegenerate: boolean) => void;
   isWebSearch: boolean;
   setIsWebSearch: (isWebSearch: boolean) => void;
}

const chatStore = create<ChatStoreType>((set) => ({
    query: "",
    setQuery: (query: string) => set({ query }),
    messages: [],
    setMessages: (messages: any) => set({ messages }),
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    isRegenerate: false,
    setIsRegenerate: (isRegenerate: boolean) => set({ isRegenerate }),
    isWebSearch: false,
    setIsWebSearch: (isWebSearch: boolean) => set({ isWebSearch }),
}))

export default chatStore
