export default function Contacts() {
  return (
    <div className="p-5 md:p-9 rounded-2xl md:rounded-3xl border border-(--gray-light) bg-(--bg-secondary) h-full max-w-full lg:order-none md:max-w-2xl gap-5 md:gap-9 md:order-last lg:min-w-auto md:min-w-full flex flex-col flex-1 min-w-[220px]">
      <div>
        <p className="text-xs md:text-sm mb-1 md:mb-2 text-(--gray)">Адрес:</p>
        <p className="text-sm md:text-base">
          107553, Москва, ул. Большая Черкизовская, 125, строение 1
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <p className="text-xs md:text-sm mb-1 md:mb-2 text-(--gray)">
            Телефон:
          </p>
          <a href="tel:84955003040" className="text-sm md:text-base">
            +7 (495) 500-30-40
          </a>
        </div>

        <div>
          <p className="text-xs md:text-sm mb-1 md:mb-2 text-(--gray)">
            Почта:
          </p>
          <a href="mailto:pressa@fclm.ru" className="text-sm md:text-base">
            pressa@fclm.ru
          </a>
        </div>
      </div>

      <p className="text-(--gray) text-xs md:text-sm">
        © 1999-2025 FCLM.RU Футбольный клуб «Локомотив», Москва При полном или
        частичном использовании материалов ссылка на официальный сайт ФК
        «Локомотив» обязательна.
      </p>
    </div>
  );
}
