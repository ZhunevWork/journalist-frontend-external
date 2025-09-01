import Button from '~/components/ui/Button';
import Checkbox from '~/components/ui/Checkbox';
import Input from '~/components/ui/Input';
import Upload from '~/components/ui/Upload';

export default function FormAccreditationApp() {
  return (
    <form className="p-8 rounded-3xl border border-(--gray-light) bg-white flex flex-col gap-6 ">
      <h4 className="text-lg">Заявление на аккредитацию</h4>

      <div className="flex gap-4">
        <Input type="tel" label="Номер телефона" />
        <Input type="text" label="Почта" />
      </div>

      <Input type="text" label="Название издания/канала" />

      <div>
        <h5>Заявление на аккредитацию</h5>

        <Upload />
      </div>

      <a href="#" target="_blank" className="text-(--green) underline">
        Как заполнить заявление на аккредитацию?
      </a>

      <label className="flex items-center  mt-auto">
        <Checkbox />
        Согласен с &nbsp;
        <a href="#" target="_blank" className="text-(--green) underline">
          правилами сервиса
        </a>
      </label>

      <Button>Подать заявку</Button>
    </form>
  );
}
