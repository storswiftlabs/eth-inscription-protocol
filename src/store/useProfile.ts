import { create } from 'zustand'
import type { ProfileType } from '@/constant/Apits'

interface Store {
  profile: ProfileType
  setProfile: (content: ProfileType) => void
}

export const useProfile = create<Store>()(set => ({
  profile: {
    type: '',
    title: '',
    text: '',
    image: [],
    receiver: [],
    at: [],
    with: '',
    height: '',
    trxHash: '',
    trxTime: '',
    sender: '',
  },
  setProfile: content => set({ profile: content }),
}))
