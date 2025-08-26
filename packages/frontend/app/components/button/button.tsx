import { type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={twMerge(
        'h-[17px] px-2.5 bg-brand hover:bg-emerald text-white font-bold text-[7px] rounded-full disabled:bg-pinkish-gray disabled:cursor-not-allowed cursor-pointer',
        className
      )}
    />
  );
}
