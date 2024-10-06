import { motion } from 'framer-motion'
import { Dispatch, SetStateAction, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from 'next-themes'

const TOGGLE_CLASSES =
  'text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10'

type ToggleOptionsType = 'light' | 'dark'

const ToggleDarkMode = ({ isCollpaseSidebar }: { isCollpaseSidebar: boolean }) => {
  const [selected, setSelected] = useState<ToggleOptionsType>('light')

  return (
    <div>
      <SliderToggle isCollpaseSidebar={isCollpaseSidebar} selected={selected} setSelected={setSelected} />
    </div>
  )
}

const SliderToggle = ({
  selected,
  setSelected,
  isCollpaseSidebar
}: {
  selected: ToggleOptionsType
  setSelected: Dispatch<SetStateAction<ToggleOptionsType>>
  isCollpaseSidebar: boolean
}) => {
  const { setTheme } = useTheme()

  return (
    <div className='relative flex w-fit items-center rounded-full'>
      <button
        className={`${TOGGLE_CLASSES} ${selected === 'light' ? 'text-white' : 'text-slate-300'}`}
        onClick={() => {
          setSelected('light')
          setTheme('light')
        }}
      >
        <FiMoon className='relative z-10 text-lg md:text-sm' />
        {isCollpaseSidebar && <span className='relative z-10'>Light</span>}
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${selected === 'dark' ? 'text-white' : 'text-slate-800'}`}
        onClick={() => {
          setSelected('dark')
          setTheme('dark')
        }}
      >
        <FiSun className='relative z-10 text-lg md:text-sm' />
        {isCollpaseSidebar && <span className='relative z-10'>Dark</span>}
      </button>
      <div className={`absolute inset-0 z-0 flex ${selected === 'dark' ? 'justify-end' : 'justify-start'}`}>
        <motion.span
          layout
          transition={{ type: 'spring', damping: 15, stiffness: 250 }}
          className='h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600'
        />
      </div>
    </div>
  )
}

export default ToggleDarkMode
