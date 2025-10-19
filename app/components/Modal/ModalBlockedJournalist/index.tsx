import Button from '~/components/ui/Button';

type PropsType = {
  onChange: (value: boolean) => void;
};

const ModalBlockedJournalist = (props: PropsType) => {
  const { onChange } = props;
  return (
    <>
      <h1 className="font-(--font-halvar) md:text-4xl text-[22px] font-bold">
        Аккаунт заблокирован
      </h1>
      <div className="md:py-7 md:px-8 border py-[22px] px-6 border-(--gray-light) shadow-[0_5px_12px_0_rgba(7,56,48,0.15)] rounded-xl">
        <p className="md:text-lg text-base leading-6 font-bold mb-2.5">
          Ваш аккаунт заблокирован
        </p>
        <p className="md:text-lg text-xs">
          Вы можете утонить причину блокировки у справочной службы:{' '}
          <a
            className="text-[#0B7159] underline"
            href="mailto:support@domain.ru"
          >
            support@domain.ru
          </a>
        </p>
      </div>
      <Button onClick={() => onChange(false)} type="button">
        Выйти
      </Button>
    </>
  );
};

export default ModalBlockedJournalist;
