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
  newMessage: {
    text: string
    image: (File | string)[]
    sender: string
  }
  setNewMessage: (conten: {
    text: string
    sender: string
    image: (File | string)[]
  }) => void
  clearNewMessage: () => void
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
  reply: { text: '', txHash: '' },
  newMessage: { text: '', sender: '', image: [''] },
  setNewMessage: content => set({ newMessage: content }),
  clearNewMessage: () => set({ newMessage: { text: '', image: [''], sender: '' } }),
  setOwnerProfileF: content => set({ ownerProfile: content }),
  setReplyMessage: content => set({ reply: content }),
  clearReplyMessage: () => set({ reply: { text: '', txHash: '' } }),
}))
