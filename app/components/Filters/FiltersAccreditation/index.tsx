import DatePicker from '~/components/ui/DatePicker';
import Input from '~/components/ui/Input';
import Select from '~/components/ui/Select';

interface FilterAccreditationsProps {
  children?: React.ReactNode;
}

export default function FilterAccreditations(props: FilterAccreditationsProps) {
  const { children } = props;

  return (
    <div className="flex flex-wrap gap-4 mb-11">
      <Input
        label="Поиск"
        iconRight={<img src="/icons/search.svg" alt="Search Icon" />}
        classNames="flex-1 max-w-[492px]"
      />
      {/* <Select label="Сортировка" />
      <Select label="Все события" />
      <Select label="Все локации" /> */}
      <DatePicker label="За всё время" classNames="flex-1 max-w-[492px]" />
      {children}
    </div>
  );
}
