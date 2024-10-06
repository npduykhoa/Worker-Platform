'use client'
import React from 'react'
import { AnimatedTooltip } from '@/components/animated-tooltip'
const people = [
  {
    id: 1,
    name: 'Cao Hoang Nam',
    designation: 'Software Engineer',
    image: '/user-placeholder.png'
  },
  {
    id: 2,
    name: 'Duy Khoa',
    designation: 'Software Engineer',
    image: '/user-placeholder.png'
  }
]

export function MembersPreview() {
  return (
    <div className='flex flex-row items-center justify-center mb-10 w-full'>
      <AnimatedTooltip items={people} />
    </div>
  )
}
