'use client'
import { useTheme } from 'next-themes'
import type { SwitchEvent } from '@nextui-org/react'
import { SwitchTheme } from './customUI/switch/SwitchTheme'

export function ThemeChanger() {
  const { setTheme } = useTheme()

  return (
    <div className="flex justify-center items-center">
      <SwitchTheme onChange={(e: SwitchEvent) => e.target.checked ? setTheme('dark') : setTheme('light')} />
    </div>
  )
}
