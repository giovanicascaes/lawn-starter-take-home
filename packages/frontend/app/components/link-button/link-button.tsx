import { NavLink, type NavLinkProps } from 'react-router';
import { twMerge } from 'tailwind-merge';

export default function LinkButton({ className, ...props }: NavLinkProps) {
  return (
    <NavLink
      {...props}
      className={props =>
        twMerge(
          'h-[17px] px-2.5 flex items-center bg-brand hover:bg-emerald text-white font-bold text-[7px] rounded-full disabled:bg-pinkish-gray disabled:cursor-not-allowed cursor-pointer',
          props.isPending &&
            'bg-pinkish-gray cursor-not-allowed hover:bg-pinkish-gray',
          typeof className === 'function' ? className(props) : className
        )
      }
    />
  );
}
