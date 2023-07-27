import React from 'react'

/**
 * @List - 一条实现
 * @param {string} props.foll - 方向 x轴 和 y轴
 */

interface Props {
  foll: string
}

function SolidX({ foll }: Props) {
  return (
    <div className={`w-full border-${foll}-[0.5px] border-${foll}-[#edecf3] dark:border-${foll}-[#262626]`} />
  )
}

export default SolidX