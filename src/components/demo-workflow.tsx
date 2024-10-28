'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

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
    // {
    //   id: 'ingest_text_0',
    //   type: 'IngestTextCorpus',
    //   status: 'completed',
    //   duration: '25s',
    //   dependencies: [],
    // },
    // {
    //   id: 'analyze_text_0_0',
    //   type: 'AnalyzeTextCorpus',
    //   status: 'running',
    //   duration: '3s',
    //   dependencies: ['ingest_text_0'],
    // },
    // {
    //   id: 'generate_0',
    //   type: 'GenerateVoiceModel',
    //   status: 'pending',
    //   duration: '-',
    //   dependencies: ['analyze_text_0_0'],
    // },
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

const GRID_ROWS = 10;
const GRID_COLS = 10;
const CELL_WIDTH = 328;
const CELL_HEIGHT = 178;

// Thêm style cho toast
const toastStyle = {
  success: {
    title: 'text-green-700',
    description: 'text-green-600',
    background: 'bg-green-50 border-green-200',
  },
};

const WorkflowViewer = () => {
  // State để lưu vị trí của các job trong grid
  const [jobPositions, setJobPositions] = useState<Record<string, { row: number; col: number }>>(() => {
    const positions: Record<string, { row: number; col: number }> = {};
    dummyData.jobs.forEach((job, index) => {
      positions[job.id] = {
        row: Math.floor(index / GRID_COLS),
        col: index % GRID_COLS,
      };
    });
    return positions;
  });

  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [draggedJob, setDraggedJob] = useState<string | null>(null);

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

  const isCellOccupied = (row: number, col: number) => {
    return Object.values(jobPositions).some((pos) => pos.row === row && pos.col === col);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    const container = document.getElementById('workflow-container');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;

    // Tính toán vị trí tương đối của chuột trong container
    const x = info.point.x - rect.left + scrollLeft;
    const y = info.point.y - rect.top + scrollTop;

    // Tính toán row và col dựa trên vị trí chuột
    const row = Math.floor(y / CELL_HEIGHT);
    const col = Math.floor(x / CELL_WIDTH);

    if (row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS) {
      setActiveCell({ row, col });
    } else {
      setActiveCell(null);
    }
  };

  const JobNode = ({ job }: { job: Job }) => {
    const position = jobPositions[job.id];
    const isDragging = draggedJob === job.id;

    return (
      <>
        {/* Ghost image ở vị trí cũ */}
        {isDragging && (
          <div
            className='absolute opacity-30 pointer-events-none'
            style={{
              left: position.col * CELL_WIDTH + 24, // Thêm padding
              top: position.row * CELL_HEIGHT + 24,
              width: CELL_WIDTH - 48, // Giảm width để tạo space cho line
              height: CELL_HEIGHT - 48,
              zIndex: 1,
            }}
          >
            <Card className='m-2 h-full'>
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
          </div>
        )}

        {/* Job card có thể kéo thả */}
        <motion.div
          className='absolute cursor-grab active:cursor-grabbing'
          style={{
            left: position.col * CELL_WIDTH + 24, // Thêm padding
            top: position.row * CELL_HEIGHT + 24,
            width: CELL_WIDTH - 48,
            height: CELL_HEIGHT - 48,
            zIndex: isDragging ? 50 : 10,
          }}
          drag
          dragMomentum={false}
          onDragStart={() => setDraggedJob(job.id)}
          onDrag={handleDrag}
          onDragEnd={(event, info) => {
            const container = document.getElementById('workflow-container');
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const scrollLeft = container.scrollLeft;
            const scrollTop = container.scrollTop;

            const x = info.point.x - rect.left + scrollLeft;
            const y = info.point.y - rect.top + scrollTop;

            const row = Math.floor(y / CELL_HEIGHT);
            const col = Math.floor(x / CELL_WIDTH);

            const isValidPosition =
              row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS && !isCellOccupied(row, col);

            if (isValidPosition) {
              setJobPositions((prev) => ({
                ...prev,
                [job.id]: { row, col },
              }));

              toast({
                title: 'Job moved successfully',
                description: `${job.type} moved to position (${row + 1}, ${col + 1})`,
                duration: 3000,
                className: `${toastStyle.success.background}`,
              });
            }
            setActiveCell(null);
            setDraggedJob(null);
          }}
        >
          <Card className='m-4 h-full'>
            {' '}
            {/* Tăng margin để tránh đè lên line */}
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
      </>
    );
  };

  return (
    <div
      id='workflow-container'
      className='relative bg-gray-50 p-4 overflow-auto'
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        className='relative'
        style={{
          width: GRID_COLS * CELL_WIDTH,
          height: GRID_ROWS * CELL_HEIGHT,
        }}
      >
        {/* Grid cells */}
        <div
          className='absolute inset-0 grid'
          style={{
            gridTemplateRows: `repeat(${GRID_ROWS}, ${CELL_HEIGHT}px)`,
            gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_WIDTH}px)`,
          }}
        >
          {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, index) => {
            const row = Math.floor(index / GRID_COLS);
            const col = index % GRID_COLS;
            return (
              <div
                key={`cell-${row}-${col}`}
                className={`relative transition-colors duration-200 ${
                  activeCell?.row === row && activeCell?.col === col ? 'bg-blue-100' : ''
                }`}
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-2 h-2 rounded-full bg-gray-200' />
                </div>
              </div>
            );
          })}
        </div>

        {/* SVG connections với arrows */}
        <svg
          className='absolute top-0 left-0 pointer-events-none'
          style={{
            width: GRID_COLS * CELL_WIDTH,
            height: GRID_ROWS * CELL_HEIGHT,
            zIndex: 5,
          }}
        >
          <defs>
            <marker id='arrowhead' markerWidth='10' markerHeight='7' refX='9' refY='3.5' orient='auto' fill='#4F46E5'>
              <polygon points='0 0, 10 3.5, 0 7' />
            </marker>
          </defs>

          {dummyData.jobs.map((job) =>
            job.dependencies.map((depId) => {
              const fromJob = dummyData.jobs.find((j) => j.id === depId);
              if (fromJob) {
                const fromPos = jobPositions[fromJob.id];
                const toPos = jobPositions[job.id];

                // Tính toán điểm bắt đầu và kết thúc của line
                const startX = fromPos.col * CELL_WIDTH + CELL_WIDTH / 2;
                const startY = fromPos.row * CELL_HEIGHT + CELL_HEIGHT / 2;
                const endX = toPos.col * CELL_WIDTH + CELL_WIDTH / 2;
                const endY = toPos.row * CELL_HEIGHT + CELL_HEIGHT / 2;

                // Tính toán điểm control cho đường cong
                const midX = (startX + endX) / 2;
                const midY = (startY + endY) / 2;

                // Tạo path cong thay vì line thẳng
                const path = `
                  M ${startX} ${startY}
                  Q ${midX} ${startY} ${midX} ${midY}
                  Q ${midX} ${endY} ${endX} ${endY}
                `;

                const gradientId = `gradient-${fromJob.id}-${job.id}`;

                return (
                  <g key={`${fromJob.id}-${job.id}`}>
                    <defs>
                      <linearGradient
                        id={gradientId}
                        gradientUnits='userSpaceOnUse'
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                      >
                        <stop offset='0%' stopColor='#4F46E5' />
                        <stop offset='100%' stopColor='#818CF8' />
                      </linearGradient>
                    </defs>
                    <path
                      d={path}
                      stroke={`url(#${gradientId})`}
                      strokeWidth={2}
                      fill='none'
                      markerEnd='url(#arrowhead)'
                      style={{
                        zIndex: 5,
                        pointerEvents: 'none',
                      }}
                    />
                  </g>
                );
              }
              return null;
            }),
          )}
        </svg>

        {/* Job nodes với padding lớn hơn */}
        {dummyData.jobs.map((job) => (
          <JobNode key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default WorkflowViewer;
