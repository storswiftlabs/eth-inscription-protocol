'use client'
import { Row, Image, Spacer } from '@nextui-org/react'
import React, { ReactNode, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FillColor } from '@/type/Moment'

/**
 * @List - 列表展示
 * @param {any} props.data - 数据
 * @param {string} props.head - 头部文本
 */

interface Props {
  data: any
  head: string
  children: ReactNode
}



function List({ data, head, children }: Props) {

  const [dataList, setDataList] = useState([])
  const { theme } = useTheme()
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  useEffect(() => {
    const a = data.slice(0, 3)
    setDataList(a)
  }, [data])





  return (
    <div>
      <p className=' font-bold text-[1.2rem]  p-[1rem]'>{head}</p>
      <Spacer y={1} />
      {
        dataList.map((i: any, j: any) => (
          <Row align='center' className=' hover:bg-[#f7f7f7] py-[1rem] dark:hover:bg-[#262626]'>
            <div className='px-[1.2rem]'>
              <Image
                css={{ borderRadius: "0.6rem" }}
                width={48}
                height={48}
                src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                alt="Default Image"
                objectFit="cover"
              />
            </div>
            <Spacer x={0.4} />
            <div className='flex flex-col'>
              <div className="flex mb-1 gap-2">
                <span className='hover:underline font-bold cursor-pointer' onClick={(e) => e.stopPropagation()}>{'news updates!'}</span>
                <span>·</span>
                <span className=' ml-[-.2rem]'>{123}</span>
                <span>members</span>
              </div>
              <div>
                <div className='flex items-center  bg-slate-300/20 rounded-xl cursor-pointer '>
                  <div className="flex items-center justify-between w-12">
                    <div className="relative w-6 h-6 rounded-full bg-blue-500"></div>
                    <div className="relative w-6 h-6 rounded-full bg-green-500 -ml-6"></div>
                    <div className="relative w-6 h-6 rounded-full bg-red-500 -ml-6"></div>
                  </div>
                  &nbsp; <span>456</span> &nbsp; <span>followers including </span>
                </div>
              </div>
            </div>
            {children}
            {/* <div className='flex-1 flex text-right justify-end pr-[1rem] cursor-pointer' onClick={() => setIsAdd(!isAdd)}> */}
            {/* {children} */}
            {/* </div> */}
          </Row>
        ))
      }
      {
        dataList.length < data.length && <div onClick={() => setDataList(data)} className='hover:bg-[#f7f7f7]  dark:hover:bg-[#262626] p-[1rem] text-[#48adf1] cursor-pointer'>
          Show more
        </div>
      }
    </div>
  )
}

export default List

