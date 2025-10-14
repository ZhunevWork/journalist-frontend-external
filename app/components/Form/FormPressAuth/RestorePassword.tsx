import { useRequestMutation } from '~/api/controllers/auth';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { useEmailMask } from '~/hooks/useEmailMask';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RestorePassword({
  setIsRestore,
}: {
  setIsRestore: () => void;
}) {
  const [restore, setRestore] = useState<boolean>(false);
  const [request] = useRequestMutation();

  const {
    email,
    onChange: onEmailChange,
    onKeyDown: onEmailKeyDown,
    isValid,
  } = useEmailMask();

  const handleRequest = () => {
    request({ email })
      .unwrap()
      .then(() => {
        setRestore(true);
        toast.success('Ссылка для восстановления отправлена на почту');
      })
      .catch(e => {
        toast.error(e.data.error);
      });
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-(--font-halvar) text-4xl">Восстановление пароля</h2>

      {!restore ? (
        <Input
          label="Почта"
          onChange={e => onEmailChange(e.target.value)}
          onKeyDown={onEmailKeyDown}
        />
      ) : (
        <p className="flex flex-col max-w-[368px] gap-4">
          <span>
            Инструкции отправлены на почту{' '}
            <a
              href="mailto:11223@gmail.com"
              className="underline text-(--bg-brand)"
            >
              11223@gmail.com
            </a>
          </span>{' '}
          <span>
            Если вы не видите письма, проверьте папку “Спам” или обратитесь в
            Службу поддержки:{' '}
            <a
              href="mailto:support@domain.ru"
              className="underline text-(--bg-brand)"
            >
              support@domain.ru
            </a>
          </span>
        </p>
      )}

      <Button
        onClick={restore ? setIsRestore : handleRequest}
        disabled={!isValid}
      >
        {restore ? 'На страницу входа' : 'Отправить ссылку'}
      </Button>
    </div>
  );
}
