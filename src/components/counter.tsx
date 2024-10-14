// src/components/pages/home-page.tsx
'use client';

import { useCounterStore } from '@/providers/store-provider';
import { Button } from './ui/button';

export const Counter = () => {
  const { count, incrementCount, decrementCount } = useCounterStore((state) => state);

  return (
    <div>
      Count: {count}
      <hr />
      <Button type='button' onClick={() => void incrementCount()}>
        Increment
      </Button>
      <Button type='button' onClick={() => void decrementCount()}>
        Decrement
      </Button>
    </div>
  );
};
