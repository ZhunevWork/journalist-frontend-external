const socials = [
  {
    title: 'vk',
    img: './icons/social/vk.svg',
    link: '',
  },
  {
    title: 'tg',
    img: './icons/social/tg.svg',
    link: '',
  },
  {
    title: 'yt',
    img: './icons/social/yt.svg',
    link: '',
  },
  {
    title: 'tt',
    img: './icons/social/tt.svg',
    link: '',
  },
  {
    title: 'ok',
    img: './icons/social/ok.svg',
    link: '',
  },
];

export default function Socials() {
  return (
    <div className="flex md:gap-20 gap-8  md:flex-col items-center justify-center min-w-[120px]">
      <img className="w-16 md:w-28.5" src="./icons/logo.svg" alt="logo" />

      <ul className="flex gap-3 md:gap-4.5">
        {socials.map(item => (
          <li className="min-w-[24px]" key={item.title}>
            <a href={item.link}>
              <img className="w-7 md:w-6" src={item.img} alt={item.title} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
