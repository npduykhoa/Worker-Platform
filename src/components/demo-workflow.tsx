'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Job {
	id: string;
	type: string;
	status: 'completed' | 'running' | 'pending';
	duration: string;
	dependencies: string[];
}

// Dummy data structure
const dummyData: {
	id: string;
	name: string;
	jobs: Job[];
} = {
	id: '01J3FZP2GYHFE6FPN3VXQXQ66W',
	name: 'TrainVoiceAssistant',
	jobs: [
		{
			id: 'ingest_text_0',
			type: 'IngestTextCorpus',
			status: 'completed',
			duration: '25s',
			dependencies: [],
		},
		{
			id: 'analyze_text_0_0',
			type: 'AnalyzeTextCorpus',
			status: 'running',
			duration: '3s',
			dependencies: ['ingest_text_0'],
		},
		{
			id: 'generate_0',
			type: 'GenerateVoiceModel',
			status: 'pending',
			duration: '-',
			dependencies: ['analyze_text_0_0'],
		},
		{
			id: 'ingest_text_1',
			type: 'IngestTextCorpus',
			status: 'completed',
			duration: '15s',
			dependencies: [],
		},
		{
			id: 'analyze_text_1_0',
			type: 'AnalyzeTextCorpus',
			status: 'running',
			duration: '-',
			dependencies: ['ingest_text_1'],
		},
		{
			id: 'analyze_text_1_1',
			type: 'AnalyzeTextCorpus',
			status: 'pending',
			duration: '-',
			dependencies: ['ingest_text_1'],
		},
		{
			id: 'generate_1',
			type: 'GenerateVoiceModel',
			status: 'pending',
			duration: '-',
			dependencies: ['analyze_text_1_0', 'analyze_text_1_1'],
		},
		{
			id: 'publish_models',
			type: 'PublishModels',
			status: 'pending',
			duration: '-',
			dependencies: ['generate_1'],
		},
	],
};

// Thêm interface cho vị trí node
interface NodePosition {
	x: number;
	y: number;
}

const WorkflowViewer = () => {
	const [zoom, setZoom] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	// Thêm state để lưu vị trí của các node
	const [nodePositions, setNodePositions] = useState<Record<string, NodePosition>>(() => {
		// Khởi tạo vị trí ban đầu cho các node theo layout tự động
		const positions: Record<string, NodePosition> = {};
		dummyData.jobs.forEach((job, index) => {
			positions[job.id] = {
				x: (index % 3) * 250 + 100, // 3 cột
				y: Math.floor(index / 3) * 150 + 100, // Khoảng cách giữa các hàng
			};
		});
		return positions;
	});

	const getStatusColor = (status: Job['status']): string => {
		switch (status) {
			case 'completed':
				return 'bg-green-500';
			case 'running':
				return 'bg-blue-500';
			case 'pending':
				return 'bg-gray-500';
			default:
				return 'bg-gray-300';
		}
	};

	const JobNode = ({ job }: { job: Job }) => {
		return (
			<motion.div
				className='absolute'
				style={{
					left: nodePositions[job.id]?.x,
					top: nodePositions[job.id]?.y,
				}}
				drag
				dragMomentum={false}
				onDragStart={() => setIsDragging(true)}
				onDragEnd={(event, info) => {
					setIsDragging(false);
					setNodePositions((prev) => ({
						...prev,
						[job.id]: {
							x: prev[job.id].x + info.offset.x,
							y: prev[job.id].y + info.offset.y,
						},
					}));
				}}
			>
				<Card className='w-48'>
					<CardHeader className='p-3'>
						<div className='flex items-center gap-2'>
							<Badge className={getStatusColor(job.status)}>{job.status}</Badge>
							<span className='text-xs text-gray-500'>{job.duration}</span>
						</div>
					</CardHeader>
					<CardContent className='p-3'>
						<div className='text-sm font-medium'>{job.type}</div>
						<div className='text-xs text-gray-500'>{job.id}</div>
					</CardContent>
				</Card>
			</motion.div>
		);
	};

	return (
		<div className='h-screen w-full bg-gray-50 overflow-hidden'>
			<div className='fixed top-4 right-4 flex gap-2 z-10'>
				<Button variant='outline' size='icon' onClick={() => setZoom((z) => Math.min(z + 0.1, 2))}>
					<ZoomIn className='h-4 w-4' />
				</Button>
				<Button variant='outline' size='icon' onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}>
					<ZoomOut className='h-4 w-4' />
				</Button>
			</div>

			<motion.div
				className='relative w-full h-full'
				style={{
					scale: zoom,
					x: position.x,
					y: position.y,
				}}
				drag={!isDragging}
				dragMomentum={false}
			>
				<svg className='absolute w-full h-full pointer-events-none'>
					{dummyData.jobs.map((job) =>
						job.dependencies.map((depId) => {
							const fromJob = dummyData.jobs.find((j) => j.id === depId);
							const toJob = job;
							if (fromJob) {
								const fromPos = nodePositions[fromJob.id];
								const toPos = nodePositions[toJob.id];
								return (
									<line
										key={`${fromJob.id}-${toJob.id}`}
										x1={fromPos.x + 96} // Một nửa chiều rộng của card (192/2)
										y1={fromPos.y + 50} // Giữa chiều cao của card
										x2={toPos.x + 96}
										y2={toPos.y + 50}
										stroke='#CBD5E0'
										strokeWidth={2}
										markerEnd='url(#arrowhead)'
									/>
								);
							}
							return null;
						}),
					)}
					<defs>
						<marker id='arrowhead' markerWidth='10' markerHeight='7' refX='9' refY='3.5' orient='auto'>
							<polygon points='0 0, 10 3.5, 0 7' fill='#CBD5E0' />
						</marker>
					</defs>
				</svg>

				<div className='relative'>
					{dummyData.jobs.map((job) => (
						<JobNode key={job.id} job={job} />
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default WorkflowViewer;
