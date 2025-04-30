import { create } from "zustand";

const useConvo = create((set) => ({
  selectedConvo: null,
  setSelectedConvo: (selectedConvo) => set({ selectedConvo }),
  messages: [],
  setMessages: (updater) =>
    set((state) => ({
      messages: typeof updater === "function" ? updater(state.messages) : updater,
    })),
}));

export default useConvo;