import Checkbox from '~/components/ui/Checkbox';
import Input from '~/components/ui/Input';
import { Radio } from '~/components/ui/Radio';
import { useAppSelector } from '~/hooks/redux';
import dayjs from 'dayjs';

export default function CardProfileData() {
  const profileData = useAppSelector(state => state.auth.profileData);
  const userData = useAppSelector(state => state.auth.userData);

  console.log('profileData in card profile', userData);

  return (
    <div className="md:p-9 p-4 rounded-3xl border border-(--gray-light) grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-3">
      <div className="flex flex-col gap-2.5">
        <span className="text-(--gray) text-sm">Тип ресурса</span>

        <Radio
          disabled
          label="СМИ"
          defaultChecked={profileData?.smi_type === 'Сми'}
        />
        <Radio
          disabled
          label="Блогер/Фотограф"
          defaultChecked={profileData?.smi_type === 'Блогер/Фотограф'}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-(--gray) text-sm">Тип аккредитации</span>

        <Radio
          disabled
          label="Пресса"
          defaultChecked={profileData?.accreditation_type === 'Пресса'}
        />
        <Radio
          disabled
          label="Фото"
          defaultChecked={profileData?.accreditation_type === 'Фото'}
        />
      </div>

      <Input label="Номер телефона" value={userData?.phone} disabled />
      <Input label="Почта" value={userData?.email} disabled />
      <Input
        label="Дата рождения"
        value={dayjs(profileData?.birthday).format('DD.MM.YYYY')}
        disabled
      />
      <Input label="Место рождения" value={profileData?.birth_place} disabled />
      <Input label="Название ресурса" value={profileData?.smi_name} disabled />
      <Input label="Ссылка на ресурс" value={profileData?.smi_url} disabled />

      <div className="bg-(--bg-secondary) border border-(--gray-light) rounded-2xl px-6 py-5 md:col-span-2 ">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <span className="text-(--gray) text-sm block md:mb-4 mb-1">
              Паспорт
            </span>

            <p>
              {profileData?.passport_number}&nbsp;
              {profileData?.passport_series}&nbsp; от&nbsp;
              {dayjs(profileData?.issue_date).format('DD.MM.YYYY')} <br />{' '}
              Выдан&nbsp;{profileData?.who_issues},&nbsp;
              {profileData?.department_code}
            </p>
          </div>
          <div>
            <Input
              type="text"
              label="Карта болельщика"
              value={profileData?.fan_id ?? ''}
              disabled={!!profileData?.fan_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
