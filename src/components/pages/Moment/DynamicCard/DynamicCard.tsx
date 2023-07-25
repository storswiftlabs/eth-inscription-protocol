'use client'
import Image from 'next/image'
import { Textarea } from '@nextui-org/react'
import { useState } from 'react'
import Link from 'next/link'

export default function DynamicCard() {
  const [love, setLove] = useState(false)
  return (
    <Link className="DynamicCard-grid" href={`/moment/${1}`}>
      <img
        src="https://console.xyz/cdn-cgi/image/width=40,height=40,fit=crop,quality=75,dpr=2/https://images.gamma.io/ipfs/Qmb84UcaMr1MUwNbYBnXWHM3kEaDcYrKuPWwyRLVTNKELC/3066.png"
        alt={''}
        width={35}
        height={35}
      ></img>
      <div className="flex ju367v10">
        <div>
          <div className=" mb-1">
            <span>0x23af....dsdsd</span>
            <span>@Tushdhs junds 7</span>
          </div>

          <div className="max-w-xs overflow-hidden overflow-ellipsis line-clamp-3 mb-2">
            Playing the guitar has also taught me discipline and patience.
            Learning new chords and songs takes time and practice. It's a
            constant journey of improvement. When I finally master a
            difficult1difficult1difficult1difficult1difficult1difficult1123
          </div>
          <div style={{ height: '14.857rem', width: '100%' }}>
            <img
              width={'100%'}
              height={'100%'}
              src="https://pbs.twimg.com/media/F1yPk5VXoAA3rGZ?format=jpg&name=medium"
              alt=""
            />
          </div>
          <div className="grid-border"></div>
          <div className=" mt-5 flex justify-between">
            <span>{fenxiang}</span>
            <span>{xinxi}</span>
            <span onClick={() => setLove(!love)}>
              {love ? xihuanLove : xihuan}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const fenxiang = (
  <svg
    className="iconhudong"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="3476"
    width="20"
    height="20"
  >
    <path
      d="M853.333333 533.333333a32 32 0 0 1 64 0v266.666667c0 64.8-52.533333 117.333333-117.333333 117.333333H224c-64.8 0-117.333333-52.533333-117.333333-117.333333V256c0-64.8 52.533333-117.333333 117.333333-117.333333h277.333333a32 32 0 0 1 0 64H224a53.333333 53.333333 0 0 0-53.333333 53.333333v544a53.333333 53.333333 0 0 0 53.333333 53.333333h576a53.333333 53.333333 0 0 0 53.333333-53.333333V533.333333z m-42.058666-277.333333l-89.792-95.402667a32 32 0 0 1 46.613333-43.861333l140.544 149.333333C927.861333 286.485333 913.376 320 885.333333 320H724.704C643.029333 320 576 391.210667 576 480v192a32 32 0 1 1-64 0V480c0-123.296 94.784-224 212.704-224h86.570667z"
      fill="#ffffff"
      p-id="3477"
      data-spm-anchor-id="a313x.7781069.0.i4"
      className="selected"
    ></path>
  </svg>
)

const xinxi = (
  <svg
    className="iconhudong xihuan"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="4534"
    width="20"
    height="20"
  >
    <path
      d="M585.6 905.6 585.6 905.6c25.6-32 38.4-44.8 41.6-44.8 208-38.4 345.6-198.4 345.6-396.8 3.2-227.2-204.8-406.4-460.8-406.4s-464 179.2-464 406.4c0 198.4 140.8 358.4 345.6 396.8 3.2 0 16 12.8 41.6 44.8l0 0c32 41.6 51.2 64 73.6 64S550.4 947.2 585.6 905.6M620.8 803.2c-19.2 3.2-32 19.2-67.2 64l0 0c-22.4 25.6-41.6 44.8-41.6 44.8l-9.6-9.6c-6.4-6.4-16-19.2-25.6-32-38.4-48-51.2-64-70.4-67.2-185.6-32-307.2-172.8-307.2-345.6 0-192 185.6-352 416-352s416 160 416 352C928 633.6 806.4 771.2 620.8 803.2z"
      p-id="4535"
      fill="#ffffff"
      className="selected"
    ></path>
    <path
      d="M281.6 470.4a1.4 1.5 0 1 0 89.6 0 1.4 1.5 0 1 0-89.6 0Z"
      p-id="4536"
      fill="#ffffff"
      className="selected"
    ></path>
    <path
      d="M467.2 470.4a1.4 1.5 0 1 0 89.6 0 1.4 1.5 0 1 0-89.6 0Z"
      p-id="4537"
      fill="#ffffff"
      className="selected"
    ></path>
    <path
      d="M652.8 470.4a1.4 1.5 0 1 0 89.6 0 1.4 1.5 0 1 0-89.6 0Z"
      p-id="4538"
      fill="#ffffff"
      className="selected"
    ></path>
  </svg>
)

const xihuan = (
  <svg
    className="iconhudong"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="5600"
    width="20"
    height="20"
  >
    <path
      d="M523.733333 841.024l33.173334-32.576 99.690666-97.813333c70.976-69.632 120.32-117.973333 138.709334-135.893334 59.008-57.514667 93.248-121.28 99.626666-184.234666 6.250667-61.44-15.488-119.744-61.589333-164.672-44.992-43.84-98.88-61.909333-157.034667-52.906667-49.365333 7.616-101.034667 34.624-150.016 78.848a21.333333 21.333333 0 0 1-28.586666 0c-48.981333-44.224-100.650667-71.232-150.016-78.869333-58.154667-8.96-112.042667 9.088-157.034667 52.928-46.101333 44.928-67.84 103.210667-61.610667 164.693333 6.4 62.933333 40.64 126.72 99.648 184.213333a100207.573333 100207.573333 0 0 1 145.92 142.826667l24.256 23.765333L512 852.522667l11.733333-11.498667z m-11.733333 11.52l-1.493333 1.429333A2.133333 2.133333 0 0 1 512 853.333333c0.512 0 1.045333 0.213333 1.493333 0.64l-1.493333-1.450666z m157.781333-721.792c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z"
      fill="#ffffff"
      p-id="5601"
      className="selected"
    ></path>
  </svg>
)

const xihuanLove = (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="10447"
    width="20"
    height="20"
  >
    <path
      d="M512 896l-60.8-55.2C236 645.6 93.6 516 93.6 358.4 93.6 229.6 194.4 128 324 128c72.8 0 142.4 33.6 188 87.2C557.6 162.4 627.2 128 700 128c128.8 0 230.4 100.8 230.4 230.4 0 157.6-142.4 287.2-357.6 482.4L512 896z"
      p-id="10448"
      data-spm-anchor-id="a313x.7781069.0.i13"
      className="selected"
      fill="#d81e06"
    ></path>
  </svg>
)
