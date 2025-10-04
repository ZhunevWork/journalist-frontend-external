import CardAccreditation from '~/components/Card/CardAccreditation';
import { useResponsive } from '~/hooks/useResponsive';
import clsx from 'clsx';

interface ListAccreditationsProps {
  title: string;
  data: any[];
  children?: React.ReactNode;
  maxHeight?: number;
}

export default function ListAccreditations(props: ListAccreditationsProps) {
  const { title, data, children, maxHeight } = props;
  const { isLg } = useResponsive();

  return (
    <div className="w-full xl:flex-1 xl:w-auto md:p-4 lg:p-8 bg-(--bg-secondary) rounded-2xl lg:rounded-3xl md:border border-(--gray-light)">
      {isLg && <h3 className="text-2xl mb-3 lg:mb-7 font-medium">{title}</h3>}

      <ul
        className={clsx(
          'flex flex-col gap-2 md:gap-4 overflow-y-auto',
          children && 'mb-7',
        )}
        style={{ maxHeight: maxHeight ? `${maxHeight}px` : '928px' }}
      >
        {data.map((item, index) => (
          <li key={index}>
            <CardAccreditation data={item} />
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
}
