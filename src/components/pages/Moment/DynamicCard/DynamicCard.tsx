import Image from 'next/image'
import { Textarea } from '@nextui-org/react'

export default function DynamicCard() {
  return (
    <div className="DynamicCard-grid">
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

          <div className="max-w-xs overflow-hidden overflow-ellipsis line-clamp-3">
            Playing the guitar has also taught me discipline and patience.
            Learning new chords and songs takes time and practice. It's a
            constant journey of improvement. When I finally master a
            difficult1difficult1difficult1difficult1difficult1difficult1123
          </div>
          <img
            src="https://pbs.twimg.com/media/F1yPk5VXoAA3rGZ?format=jpg&name=medium"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
