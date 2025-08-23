import Checkbox from '~/components/ui/Checkbox';
import Input from '~/components/ui/Input';
import { Radio } from '~/components/ui/Radio';

export default function CardProfileData() {
  return (
    <div className="md:p-9 p-4 rounded-3xl border border-(--gray-light) grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-3">
      <div className="flex flex-col gap-2.5">
        <span className="text-(--gray) text-sm">Тип ресурса</span>

        <Radio disabled label="СМИ" />
        <Radio disabled label="Блогер/Фотограф" defaultChecked />
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-(--gray) text-sm">Тип аккредитации</span>

        <Radio disabled label="СМИ" />
        <Radio disabled label="Блогер/Фотограф" defaultChecked />
      </div>

      <Input label="Номер телефона" value="+79969198193" disabled />
      <Input label="Почта" value="+79969198193" disabled />
      <Input label="Дата рождения" value="+79969198193" disabled />
      <Input label="Место рождения" value="+79969198193" disabled />
      <Input label="Название ресурса" value="+79969198193" disabled />
      <Input label="Ссылка на ресурс" value="+79969198193" disabled />

      <div className="bg-(--bg-secondary) border border-(--gray-light) rounded-2xl px-6 py-5 md:col-span-2 ">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <span className="text-(--gray) text-sm block md:mb-4 mb-1">
              Паспорт
            </span>

            <p>
              42 14 123542 от 21.06.2020 <br /> Выдан ГУ МВД России, 770-015
            </p>
          </div>
          <div>
            <span className="text-(--gray) text-sm block md:mb-4 mb-1">
              Карта болельщика
            </span>

            <p>123456789</p>
          </div>
        </div>
      </div>
    </div>
  );
}
