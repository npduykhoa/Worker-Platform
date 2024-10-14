import { QueueTable } from '@/components/queue-table';
import { renderBlock } from '@/components/tools/renderBlock';
import React from 'react';

interface SectionProps {
  component: React.FC;
  componentName: string;
  props?: object;
  className?: string;
}

const sections: Array<SectionProps> = [
  {
    component: QueueTable,
    componentName: 'QueuePage',
    props: {},
    className: 'bg-indigo-50 dark:bg-slate-900',
  },
];

export default function QueuePage() {
  return sections.map((section, key) => {
    return renderBlock(section, key);
  });
}
