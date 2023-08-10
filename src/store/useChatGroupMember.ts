import { create } from 'zustand'

interface Store {
  GroupMember: {
    title: string
    receiver: string[]
  }[]
  setGroupMember: (content: { title: string; receiver: string[] }[]) => void
}

export const useGroupMember = create<Store>()(set => ({
  GroupMember: [{ title: '', receiver: [] }],
  setGroupMember: content => set({ GroupMember: content }),
}))
