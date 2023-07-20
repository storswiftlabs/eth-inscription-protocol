'use client'
import { useTheme } from 'next-themes'
import type { SwitchEvent } from '@nextui-org/react'
import { Switch } from '@nextui-org/react'

export function ThemeChanger() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex justify-center items-center">
      Switch Theme &nbsp;
      <Switch
        onChange={(e: SwitchEvent) =>
          e.target.checked ? setTheme('dark') : setTheme('light')
        }
      />
    </div>
  )
}
