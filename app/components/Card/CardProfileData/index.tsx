import { useUpdateProfileMutation } from '~/api/controllers/profile';
import Checkbox from '~/components/ui/Checkbox';
import Input from '~/components/ui/Input';
import { Radio } from '~/components/ui/Radio';
import { useAppSelector } from '~/hooks/redux';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CardProfileData() {
  const profileData = useAppSelector(state => state.auth.profileData);
  const userData = useAppSelector(state => state.auth.userData);

  const [checked, setChecked] = useState(profileData?.mailing);
  const [fanId, setFanId] = useState(profileData?.fan_id ?? '');

  const [updateProfile] = useUpdateProfileMutation();

  const handleChangeFanId = () => {
    updateProfile({ id: profileData?.id as number, body: { fan_id: fanId } })
      .unwrap()
      .then(() => toast.success('Карта болельшика измененеа'))
      .catch(() => toast.error('Не удалось обновить карту болельшика'));
  };

  const handleChangeSubscribe = () => {
    updateProfile({
      id: profileData?.id as number,
      body: { mailing: checked },
    })
      .unwrap()
      .then(() => toast.success(checked ? 'Вы подписались' : 'Вы отписались'))
      .catch(() =>
        toast.error(`Не удалось ${checked ? 'подписаться' : 'отписаться'}`),
      );
  };

  return (
    <div className="md:p-9 p-4 rounded-3xl border border-(--gray-light) grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-3">
      <div
        className={clsx(
          'md:col-span-2 col-span-1 grid grid-cols-1 gap-4',
          userData?.middle_name ? 'md:grid-cols-3' : 'grid-cols-2',
        )}
      >
        <Input label="Фамилия" value={userData?.last_name} disabled />
        <Input label="Имя" value={userData?.name} disabled />
        {userData?.middle_name && (
          <Input label="Отчество" value={userData?.middle_name} disabled />
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-(--gray) text-sm">Тип ресурса</span>

        <Radio
          disabled
          label="СМИ"
          defaultChecked={profileData?.smi_type === 'mass_media'}
        />
        <Radio
          disabled
          label="Блогер/Фотограф"
          defaultChecked={profileData?.smi_type === 'blogger/photographer'}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-(--gray) text-sm">Тип аккредитации</span>

        <Radio
          disabled
          label="Пресса"
          defaultChecked={profileData?.accreditation_type === 'press'}
        />
        <Radio
          disabled
          label="Фото"
          defaultChecked={profileData?.accreditation_type === 'photo'}
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
              {profileData?.passport_series}&nbsp;
              {profileData?.passport_number}&nbsp; от&nbsp;
              {dayjs(profileData?.issue_date).format('DD.MM.YYYY')} <br />{' '}
              Выдан&nbsp;{profileData?.who_issues},&nbsp;
              {profileData?.department_code}
            </p>
          </div>
          <div>
            <Input
              type="text"
              label="Карта болельщика"
              value={fanId ?? ''}
              disabled={!!profileData?.fan_id}
              onChange={e => setFanId(e.target.value)}
              iconRight={
                (profileData?.fan_id ?? '') !== fanId ? (
                  <button
                    className="hover:opacity-80 h-full hover:cursor-pointer"
                    onClick={handleChangeFanId}
                  >
                    <img src="./icons/check-large.svg" alt="check" />
                  </button>
                ) : null
              }
            />
          </div>
        </div>
      </div>

      <div className="px-2.5 py-4 border rounded-xl border-(--gray-light) w-[310px] flex items-center justify-between">
        <Checkbox
          checked={checked}
          onChange={() => setChecked(!checked)}
          label="Рассылка"
        />
        {profileData?.mailing !== checked && (
          <button
            className="hover:opacity-80 h-full w-[28px] hover:cursor-pointer"
            onClick={handleChangeSubscribe}
          >
            <img src="./icons/check-large.svg" alt="check" />
          </button>
        )}
      </div>
    </div>
  );
}
