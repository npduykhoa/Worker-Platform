import { DataTable } from '@/components/data-table'
import { renderBlock } from '@/components/tools/renderBlock'
import React from 'react'

interface SectionProps {
  component: React.FC
  componentName: string
  props?: object
  className?: string
}

const sections: Array<SectionProps> = [
  {
    component: DataTable,
    componentName: 'WorkflowsPage',
    props: {},
    className: 'bg-indigo-50 dark:bg-slate-900'
  }
]

export default function WorkflowsPage() {
  return sections.map((section, key) => {
    return renderBlock(section, key)
  })
}
