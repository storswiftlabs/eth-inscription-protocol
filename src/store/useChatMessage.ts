import { create } from 'zustand'

interface Store {
  reply: {
    text: string
    txHash: string
  }
  setReplyMessage: (reply: {
    text: string
    txHash: string
  }) => void
  clearReplyMessage: () => void
}

export const useChatMessageReply = create<Store>()(set => ({
  reply: { text: '', txHash: '' },
  setReplyMessage: content => set({ reply: content }),
  clearReplyMessage: () => set({ reply: { text: '', txHash: '' } }),
}))
