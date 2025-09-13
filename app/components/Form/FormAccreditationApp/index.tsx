import type { IEvent } from '~/api/controllers/events/types';
import Button from '~/components/ui/Button';
import Checkbox from '~/components/ui/Checkbox';
import Input from '~/components/ui/Input';
import Upload from '~/components/ui/Upload';
import { useAppSelector } from '~/hooks/redux';
import { useForm } from 'react-hook-form';

interface IFormAccreditationAppProps {
  data: IEvent | null;
}

type FormValues = {
  phone: string;
  email: string;
  smi_name: string;
};

export default function FormAccreditationApp(
  props: IFormAccreditationAppProps,
) {
  const { data } = props;

  const userData = useAppSelector(s => s.auth.userData);
  const profileData = useAppSelector(s => s.auth.profileData);

  const { register, watch } = useForm<FormValues>({
    defaultValues: {
      phone: userData?.phone,
      email: userData?.email,
      smi_name: profileData?.smi_name,
    },
  });

  console.log('data', data);
  const values = watch();

  return (
    <form className="p-8 rounded-3xl border border-(--gray-light) bg-white flex flex-col gap-6 ">
      <h4 className="text-lg">Заявление на аккредитацию</h4>

      <div className="flex gap-4">
        <Input
          type="tel"
          label="Номер телефона"
          value={values.phone}
          disabled
          {...register('phone')}
        />
        <Input
          type="text"
          label="Почта"
          value={values.email}
          disabled
          {...register('email')}
        />
      </div>

      <Input
        type="text"
        label="Название издания/канала"
        value={values.smi_name}
        disabled
        {...register('smi_name')}
      />

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
