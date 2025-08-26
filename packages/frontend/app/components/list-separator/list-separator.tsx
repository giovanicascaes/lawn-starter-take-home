import { twMerge } from 'tailwind-merge';

export default function ListSeparator({ className }: { className?: string }) {
  return (
    <hr
      className={twMerge(
        'border-none bg-pinkish-gray h-[0.5px] w-full',
        className
      )}
    />
  );
}
