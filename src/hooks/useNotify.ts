'use client'
import type { notifyType } from '@web3uikit/core'
import { useNotification } from '@web3uikit/core'
import type React from 'react'

export function useHandleNotify() {
  const dispatch = useNotification()

  const handleNewNotification = (
    type: notifyType,
    message?: string,
    title?: string,
    icon?: React.ReactElement,

  ) => {
    dispatch({
      type,
      message,
      title,
      icon,
      position: 'topR',
    })
  }
  return { handleNewNotification }
}
