import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateAccreditationMutation } from '~/api/controllers/accreditation';
import type { IEvent } from '~/api/controllers/events/types';
import {
  formAccreditationAppSchema,
  type FormAccreditationAppValues,
} from '~/components/Form/FormAccreditationApp/utils/formAccreditationAppValidation';
import ListAccreditationApps from '~/components/List/ListAccreditationApps';
import Button from '~/components/ui/Button';
import Checkbox from '~/components/ui/Checkbox';
import Input from '~/components/ui/Input';
import Upload from '~/components/ui/Upload';
import { useAppSelector } from '~/hooks/redux';
import { useResponsive } from '~/hooks/useResponsive';
import clsx from 'clsx';
import type { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface FormAccreditationAppProps {
  date: Dayjs;
  events: IEvent[];
  onClose: () => void;
}

export default function FormAccreditationApp(props: FormAccreditationAppProps) {
  const { events, onClose, date } = props;
  const [isFanIdRequerd, setIsFanIdRequerd] = useState<boolean>(false);
  const userData = useAppSelector(s => s.auth.userData);
  const profileData = useAppSelector(s => s.auth.profileData);

  const [createAccreditation, { isLoading }] = useCreateAccreditationMutation();

  const { isLg } = useResponsive();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormAccreditationAppValues>({
    resolver: yupResolver(formAccreditationAppSchema),
    defaultValues: {
      event_id: undefined,
      journalist_id: userData?.id,
      accreditation_applications: [],
      agreedToTerms: false,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('event_id', NaN);
    trigger('event_id');
  }, [date]);

  const handleChangeActiveEvent = useCallback((eventId: number) => {
    setValue('event_id', eventId);
    trigger('event_id');
  }, []);

  const onSubmit = (data: FormAccreditationAppValues) => {
    const res = createAccreditation(data)
      .unwrap()
      .then(() => {
        toast.success('Заявка успешно отправлена');
        onClose();
      })
      .catch((error: any) => {
        if (error?.data?.messages?.event_id?.[0]) {
          toast(error?.data?.messages?.event_id?.[0]);
        }
        if (
          error?.status === 400 &&
          error?.data?.messages?.event_id?.[0] ===
            'На данное мероприятие необходим FanId'
        ) {
          setIsFanIdRequerd(true);
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx('flex gap-8 max-h-[600px]', !isLg && 'flex-col')}
    >
      <ListAccreditationApps
        events={events}
        selectedEventId={watch('event_id')}
        onChangeActiveEvent={handleChangeActiveEvent}
      />

      <div className="p-8 rounded-3xl border border-(--gray-light) bg-white flex flex-col gap-6 ">
        <h4 className="text-lg">Заявление на аккредитацию</h4>

        <div className="flex gap-4">
          <Input
            type="tel"
            label="Номер телефона"
            value={userData?.phone}
            disabled
          />
          <Input type="text" label="Почта" value={userData?.email} disabled />
        </div>

        <Input
          type="text"
          label="Название издания/канала"
          value={profileData?.smi_name}
          disabled
        />

        <div>
          <h5>Заявление на аккредитацию</h5>

          <Controller
            name="accreditation_applications"
            control={control}
            render={({ field }) => (
              <Upload
                multiple
                classNames="mb-4"
                accept=".pdf,.jpg,.jpeg,.png"
                value={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <a href="#" target="_blank" className="text-(--green) underline">
          Как заполнить заявление на аккредитацию?
        </a>

        <label className="flex items-center  mt-auto">
          <Checkbox {...register('agreedToTerms')} />
          Согласен с &nbsp;
          <a href="#" target="_blank" className="text-(--green) underline">
            правилами сервиса
          </a>
        </label>

        <Button
          type="submit"
          disabled={!isValid || isLoading || isFanIdRequerd}
        >
          {isFanIdRequerd ? 'Необходима карта болельщика' : 'Подать заявку'}
        </Button>
      </div>
    </form>
  );
}
