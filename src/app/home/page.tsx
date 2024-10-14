import { renderBlock } from '@/components/tools/renderBlock';
import React from 'react';
import WorkflowsPage from '@/app/workflows/page';
import { Counter } from '@/components/counter';
import { CounterStoreProvider } from '@/providers/store-provider';

interface SectionProps {
  component: React.FC;
  componentName: string;
  props?: object;
  className?: string;
}

const sections: Array<SectionProps> = [
  {
    component: WorkflowsPage,
    componentName: 'WorkflowsPage',
    props: {},
    className: 'bg-indigo-50',
  },
  {
    component: Counter,
    componentName: 'Counter',
    props: {},
    className: 'bg-indigo-50',
  },
];

export default function HomePage() {
  return (
    <main className='w-full'>
      {sections.map((section, key) => {
        return <CounterStoreProvider key={key}>{renderBlock(section, key)}</CounterStoreProvider>;
      })}
    </main>
  );
}
