export default function Links() {
  return (
    <ul className="p-5 md:p-9 rounded-2xl md:rounded-3xl border border-(--gray-light) bg-(--bg-secondary) flex md:flex-col gap-4 md:gap-6 text-base md:text-xl font-medium min-w-[180px] w-full md:w-fit md:flex-1 lg:flex-none flex-wrap justify-between">
      <li>
        <a
          href="#"
          className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap"
        >
          <span>ФК Локомотив</span>
          <img
            src="./icons/double-arrow.svg"
            alt="arrow"
            className="w-3 md:w-4"
          />
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap"
        >
          <span>Для СМИ</span>
          <img
            src="./icons/double-arrow.svg"
            alt="arrow"
            className="w-3 md:w-4"
          />
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap"
        >
          <span>Пресс-центр</span>
          <img
            src="./icons/double-arrow.svg"
            alt="arrow"
            className="w-3 md:w-4"
          />
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap"
        >
          <span>FAQ</span>
          <img
            src="./icons/double-arrow.svg"
            alt="arrow"
            className="w-3 md:w-4"
          />
        </a>
      </li>
    </ul>
  );
}
