import React from 'react'

/**
 * @List - 一条实现
 * @param {string} props.foll - 方向 x轴 和 y轴
 */

interface Props {
  foll: string
}

function Solid({ foll }: Props) {
  return (
    <div className={`w-full border-y-[0.5px] border-y-[#edecf3] dark:border-y-[#262626]`} />
  )
}

export default Solid