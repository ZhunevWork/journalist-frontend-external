interface DateTabsProps {
  date: string;
  onPrev?: () => void;
  onNext?: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
}

export default function DateTabs(props: DateTabsProps) {
  const { date, onPrev, onNext, disabledNext, disabledPrev } = props;

  return (
    <div className="flex items-center justify-start gap-2 md:gap-4 mb-2 md:mb-4">
      <button
        className="p-1 md:p-2 rounded hover:rounded-full hover:bg-gray-100 transition cursor-pointer"
        onClick={onPrev}
        aria-label="Предыдущий месяц"
        disabled={disabledPrev}
      >
        <img src="./icons/round-arrow-back.svg" alt="arrow back" />
      </button>
      <div className="font-semibold text-lg md:text-2xl">{date}</div>
      <button
        className="p-1 md:p-2 rounded hover:rounded-full hover:bg-gray-100 transition cursor-pointer"
        onClick={onNext}
        aria-label="Следующий месяц"
        disabled={disabledNext}
      >
        <img src="./icons/round-arrow-next.svg" alt="arrow next" />
      </button>
    </div>
  );
}
