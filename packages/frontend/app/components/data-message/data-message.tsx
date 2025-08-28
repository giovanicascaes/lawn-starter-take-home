import type { ReactNode } from 'react';

interface DataMessageProps {
  children: ReactNode;
  className?: string;
}

export default function DataMessage({
  children,
  className = '',
}: DataMessageProps) {
  return (
    <span
      className={`max-w-[162px] text-[7px] text-center font-bold text-pinkish-gray my-auto ${className}`}
    >
      {children}
    </span>
  );
}
