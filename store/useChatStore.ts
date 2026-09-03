import { create } from "zustand";
import { chatMessages as seedMessages } from "@/data/mockData";

type Message = { id: string; role: "user" | "assistant"; text: string };

interface ChatState {
  messages: Message[];
  sendMessage: (text: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: seedMessages,
  sendMessage: (text) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { id: `u-${Date.now()}`, role: "user", text },
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: "Got it — I've updated your plan. (This is a UI-only prototype; connect an AI backend to make this respond for real.)",
        },
      ],
    })),
}));
