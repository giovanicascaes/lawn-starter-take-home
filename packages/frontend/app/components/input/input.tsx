import { type InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={twMerge(
        'h-5 rounded-xs border border-pinkish-gray outline-none inset-shadow-[0_0.5px_1.5px_0] inset-shadow-warm-gray focus:border-unamed-gray placeholder:text-pinkish-gray text-[7px] placeholder:font-bold px-[5px]',
        className
      )}
    />
  );
}
