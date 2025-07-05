
import { create } from "zustand";

interface Thread {
    threadId: string;
    title: string;
    isPinned: boolean;
}
type ThreadsStoreType = {
   searchedThreads: Thread[];
   setSearchedThreads: (searchedThreads: Thread[]) => void;
}

const threadsStore = create<ThreadsStoreType>((set) => ({
    searchedThreads: [],
    setSearchedThreads: (searchedThreads: Thread[]) => set({ searchedThreads }),
}))

export default threadsStore
