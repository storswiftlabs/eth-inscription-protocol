import { create } from 'zustand'

interface Store {
  reply: {
    text: string
    txHash: string
  }
  inc: (reply: {
    text: string
    txHash: string
  }) => void
}

const useChatMessageReply = create<Store>()(set => ({
  reply: { text: '', txHash: '' },
  inc: content => set({ reply: content }),
}))
