'use client'

import { ThemeProvider } from 'next-themes'
import '../../style/moment.css'
import { useState } from 'react'
import { text } from 'stream/consumers'

export default function Home() {
  const [nav, setNav] = useState('Find')
  const [iconData, setIcon] = useState([
    {
      text: 'Find',
      icon: findSvg,
    },
    {
      text: 'Message',
      icon: messageSvg,
    },
    {
      icon: bookmarkSvg,
      text: 'Bookmark',
    },
    {
      icon: verifySvg,
      text: 'Verify',
    },
    {
      icon: moreSvg,
      text: 'More',
    },
  ])

  const iconComponent = (svg: React.JSX.Element, text: string) => {
    return (
      <div
        onClick={() => setNav(text)}
        className={`icon-div flex ${nav === text ? 'navSelected' : ''}`}
        style={{ padding: '0.8rem 1rem' }}
      >
        <span style={{ marginRight: '1rem' }}>{svg}</span>
        <span>{text}</span>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <main className="nav flex min-h-screen flex-col items-center  p-20">
        <div>
          {iconData.map((i, j) => {
            return iconComponent(i.icon, i.text)
          })}
        </div>
      </main>
      <div>123</div>
    </ThemeProvider>
  )
}

const findSvg = (
  <svg
    aria-hidden="true"
    className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
  >
    <g>
      <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path>
    </g>
  </svg>
)

const messageSvg = (
  <svg
    aria-hidden="true"
    className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
  >
    <g>
      <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
    </g>
  </svg>
)

const bookmarkSvg = (
  <svg
    aria-hidden="true"
    className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
  >
    <g>
      <path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z"></path>
    </g>
  </svg>
)

const verifySvg = (
  <svg
    aria-hidden="true"
    className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
  >
    <g>
      <path d="M8.52 3.59c.8-1.1 2.04-1.84 3.48-1.84s2.68.74 3.49 1.84c1.34-.21 2.74.14 3.76 1.16s1.37 2.42 1.16 3.77c1.1.8 1.84 2.04 1.84 3.48s-.74 2.68-1.84 3.48c.21 1.34-.14 2.75-1.16 3.77s-2.42 1.37-3.76 1.16c-.8 1.1-2.05 1.84-3.49 1.84s-2.68-.74-3.48-1.84c-1.34.21-2.75-.14-3.77-1.16-1.01-1.02-1.37-2.42-1.16-3.77-1.09-.8-1.84-2.04-1.84-3.48s.75-2.68 1.84-3.48c-.21-1.35.14-2.75 1.16-3.77s2.43-1.37 3.77-1.16zm3.48.16c-.85 0-1.66.53-2.12 1.43l-.38.77-.82-.27c-.96-.32-1.91-.12-2.51.49-.6.6-.8 1.54-.49 2.51l.27.81-.77.39c-.9.46-1.43 1.27-1.43 2.12s.53 1.66 1.43 2.12l.77.39-.27.81c-.31.97-.11 1.91.49 2.51.6.61 1.55.81 2.51.49l.82-.27.38.77c.46.9 1.27 1.43 2.12 1.43s1.66-.53 2.12-1.43l.39-.77.82.27c.96.32 1.9.12 2.51-.49.6-.6.8-1.55.48-2.51l-.26-.81.76-.39c.91-.46 1.43-1.27 1.43-2.12s-.52-1.66-1.43-2.12l-.77-.39.27-.81c.32-.97.12-1.91-.48-2.51-.61-.61-1.55-.81-2.51-.49l-.82.27-.39-.77c-.46-.9-1.27-1.43-2.12-1.43zm4.74 5.68l-6.2 6.77-3.74-3.74 1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36z"></path>
    </g>
  </svg>
)

const moreSvg = (
  <svg
    aria-hidden="true"
    className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
  >
    <g>
      <path d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-4.75 11.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25S6 11.31 6 12s.56 1.25 1.25 1.25zm9.5 0c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zM13.25 12c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25z"></path>
    </g>
  </svg>
)
