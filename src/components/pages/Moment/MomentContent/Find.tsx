'use client'
import React from 'react'
import DynamicCard from '../DynamicCard/DynamicCard'

function Find() {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, j) => (
        <DynamicCard />
      ))}
    </div>
  )
}

export default Find
