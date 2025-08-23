import CardAccreditation from '~/components/Card/CardAccreditation';
import clsx from 'clsx';

interface ListAccreditationsProps {
  title: string;
  data: any[];
  children?: React.ReactNode;
}

export default function ListAccreditations(props: ListAccreditationsProps) {
  const { title, data, children } = props;

  return (
    <div className="w-full xl:flex-1 xl:w-auto p-4 lg:p-8 bg-(--bg-secondary) rounded-2xl lg:rounded-3xl border border-(--gray-light)">
      <h3 className="text-2xl mb-3 lg:mb-7 font-medium">{title}</h3>

      <ul
        className={clsx(
          'flex flex-col gap-2 md:gap-4 max-h-[928px] overflow-y-auto',
          children && 'mb-7',
        )}
      >
        {data.map((item, index) => (
          <li key={index}>
            <CardAccreditation />
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
}
