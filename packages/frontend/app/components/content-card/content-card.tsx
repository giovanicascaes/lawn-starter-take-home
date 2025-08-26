import { twMerge } from 'tailwind-merge';

export default function ContentCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        'flex flex-col w-full h-fit p-[15px] shadow-[0_0.5px_1px_0] shadow-green-teal-gray border border-green-teal-gray rounded-xs bg-white',
        className
      )}
    >
      {children}
    </div>
  );
}
