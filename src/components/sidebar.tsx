'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { IconType } from 'react-icons'
import { GoWorkflow } from 'react-icons/go'
import { FaStackExchange } from 'react-icons/fa'
import { IoFileTrayStackedOutline } from 'react-icons/io5'
import { LuNetwork } from 'react-icons/lu'

import { FiChevronDown, FiChevronsRight, FiUsers } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ToggleDarkMode from '@/components/toggle-theme'

export const NavigationBar = () => {
  return <Sidebar />
}

const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState('Dashboard')

  return (
    <motion.nav
      layout
      className='sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2 dark:bg-slate-700'
      style={{
        width: open ? '225px' : 'fit-content'
      }}
    >
      <TitleSection open={open} />

      <div className='space-y-1'>
        <Option
          Icon={FaStackExchange}
          title='Jobs'
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={50}
          url='/jobs'
        />
        <Option
          Icon={IoFileTrayStackedOutline}
          title='Queue'
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={15}
          url='/queue'
        />
        <Option
          Icon={LuNetwork}
          title='Workflows'
          selected={selected}
          setSelected={setSelected}
          open={open}
          url='/workflows'
        />
        <Option
          Icon={FiUsers}
          title='Members'
          selected={selected}
          setSelected={setSelected}
          open={open}
          url='/members'
        />
      </div>

      <ToggleDarkMode isCollpaseSidebar={open} />
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  )
}

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  url
}: {
  Icon: IconType
  title: string
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  open: boolean
  notifs?: number
  url: string
}) => {
  return (
    <Link href={`${url}`}>
      <motion.button
        layout
        onClick={() => setSelected(title)}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          selected === title ? 'bg-indigo-100 text-indigo-800' : 'text-slate-500 hover:bg-slate-100'
        }`}
      >
        <motion.div layout className='grid h-full w-10 place-content-center text-lg'>
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className='text-md font-medium'
          >
            {title}
          </motion.span>
        )}

        {notifs && open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            style={{ y: '-50%' }}
            transition={{ delay: 0.5 }}
            className='absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-md text-white'
          >
            {notifs}
          </motion.span>
        )}
      </motion.button>
    </Link>
  )
}

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className='mb-3 border-b border-slate-300 pb-3'>
      <div className='flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100'>
        <div className='flex items-center gap-2'>
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className='block text-md font-semibold'>Workflow Platform</span>
              <span className='block text-md text-slate-500'>Pro Team</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className='mr-2' />}
      </div>
    </div>
  )
}

const Logo = () => {
  return (
    <motion.div layout className='grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600'>
      <GoWorkflow className='text-white' />
    </motion.div>
  )
}

const ToggleClose = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className='absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100'
    >
      <div className='flex items-center p-2'>
        <motion.div layout className='grid size-10 place-content-center text-lg'>
          <FiChevronsRight className={`transition-transform ${open && 'rotate-180'}`} />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className='text-md font-medium'
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  )
}
