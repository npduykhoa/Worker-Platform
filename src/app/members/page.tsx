import { MembersPreview } from '@/components/member-info';
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
    component: MembersPreview,
    componentName: 'MembersPage',
    props: {},
    className: 'flex items-center bg-indigo-50 dark:bg-slate-900',
  },
];

export default function MembersPage() {
  return sections.map((section, key) => {
    return renderBlock(section, key);
  });
}
