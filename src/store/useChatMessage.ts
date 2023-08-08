import { create } from 'zustand'

interface Store {
  ownerProfile: {
    image: string
    text: string
  }
  reply: {
    text: string
    txHash: string
  }
  setOwnerProfileF: (conten: {
    image: string
    text: string
  }) => void
  setReplyMessage: (reply: {
    text: string
    txHash: string
  }) => void
  clearReplyMessage: () => void
}

export const useChatMessageReply = create<Store>()(set => ({
  ownerProfile: { image: '', text: '' },
  setOwnerProfileF: content => set({ ownerProfile: content }),
  reply: { text: '', txHash: '' },
  setReplyMessage: content => set({ reply: content }),
  clearReplyMessage: () => set({ reply: { text: '', txHash: '' } }),
}))
