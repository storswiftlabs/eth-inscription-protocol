import { Row, Image, Spacer } from '@nextui-org/react'
import React from 'react'

function List() {
  return (
    <div>
      <p className=' font-bold text-[1.2rem]'>Discover new Lists</p>
      <Spacer y={1} />
      <Row>
        <div>
          <Image
            css={{ borderRadius: "0.6rem" }}
            width={48}
            height={48}
            src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
            alt="Default Image"
            objectFit="cover"
          />
        </div>
        <Spacer x={1} />
        <div className='flex flex-col'>
          <div className="flex mb-1 gap-2">
            <span className='hover:underline font-bold' onClick={(e) => e.stopPropagation()}>{'news updates!'}</span>
            <span>·</span>
            <span className=' ml-[-.2rem]'>{123}</span>
            <span>members</span>
          </div>
          <div>12</div>
        </div>
      </Row>
    </div>
  )
}

export default List