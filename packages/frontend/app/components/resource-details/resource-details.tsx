import { twMerge } from 'tailwind-merge';
import ContentCard from '~/components/content-card/content-card';
import ListSeparator from '~/components/list-separator/list-separator';
import LinkButton from '../link-button/link-button';

export function ResourceDetailsItem({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge('flex flex-col w-full', className)}>
      <h2 className="font-bold text-black text-[8px] m-[0_0_5px]">{title}</h2>
      <ListSeparator className="mb-[2.5px]" />
      <p className="text-[7px] text-black">{children}</p>
    </div>
  );
}

export default function ResourceDetails({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ContentCard className="p-[15px] min-h-[159px]">
      <h1 className="font-bold text-black text-[9px] m-[0_0_15px]">{title}</h1>
      {children}
      <LinkButton to="/" className="mt-[15px] w-fit">
        BACK TO SEARCH
      </LinkButton>
    </ContentCard>
  );
}
