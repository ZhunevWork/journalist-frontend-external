import {
  useApproveEmailMutation,
  useSendNewCodeMutation,
} from '~/api/controllers/auth';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { setUserData } from '~/store/authSlice';
import { useState } from 'react';
import { toast } from 'sonner';

export default function EmailConfirmation() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(s => s.auth.userData);

  const [code, setCode] = useState<string>('');

  const [approveEmail] = useApproveEmailMutation();
  const [sendNewCode] = useSendNewCodeMutation();

  const handleApproveEmail = () => {
    approveEmail({ code })
      .unwrap()
      .then(data => {
        dispatch(setUserData(data.data));
        toast.success('Код подтвержден');
      })
      .catch(() => toast.error('Неверный код'));
  };

  const handleSendNewCode = () => {
    sendNewCode()
      .unwrap()
      .then(() => toast.success('Код отправлен'))
      .catch(() => toast.error('Не удалось отправить код'));
  };

  return (
    <form>
      <h2 className="font-bold md:text-4xl text-[22px] mb-8">
        Подтвердите электронную почту
      </h2>

      <Input label="Почта" value={userData?.email} disabled classNames="mb-4" />
      <Input
        label="Код"
        classNames="mb-2"
        onChange={e => setCode(e.target.value)}
      />

      <Button
        styleType="transparent"
        type="button"
        classNames="w-full mb-3"
        onClick={handleSendNewCode}
      >
        Отправить код повторно
      </Button>

      <Button type="button" classNames="w-full" onClick={handleApproveEmail}>
        Подтвердить
      </Button>
    </form>
  );
}
