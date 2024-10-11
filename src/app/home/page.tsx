import { renderBlock } from '@/components/tools/renderBlock';
import React from 'react';
import WorkflowsPage from '@/app/workflows/page';

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
];

export default function HomePage() {
	return sections.map((section, key) => {
		return renderBlock(section, key);
	});
}
