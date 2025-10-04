const links = [
  {
    id: 1,
    name: 'ФК Локомотив',
    link: '',
    logo: './icons/double-arrow.svg',
  },
  {
    id: 2,
    name: 'Для СМИ',
    link: '',
    logo: './icons/double-arrow.svg',
  },
  {
    id: 3,
    name: 'Пресс-центр',
    link: '',
    logo: './icons/double-arrow.svg',
  },
  {
    id: 4,
    name: 'FAQ',
    link: '',
    logo: './icons/double-arrow.svg',
  },
];

export default function Links() {
  return (
    <ul className="p-5 md:p-9 rounded-2xl md:rounded-3xl border border-(--gray-light) bg-(--bg-secondary) flex sm:flex-row md:flex-col flex-col gap-4 md:gap-6 text-lg md:text-xl font-medium min-w-[180px] w-full md:w-fit md:flex-1 lg:flex-none justify-between">
      {links.map(item => (
        <li key={item.id}>
          <a
            href={item.link}
            className="flex items-center gap-2 text-lg md:text-sm whitespace-nowrap"
          >
            <span>{item.name}</span>
            <img src={item.logo} alt={item.name} className="w-3 md:w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
