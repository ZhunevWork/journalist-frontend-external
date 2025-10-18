import Button from '~/components/ui/Button';

type PropsType = {
  onChange: (value: boolean) => void;
};

const ModalBlockedJournalist = (props: PropsType) => {
  const { onChange } = props;
  return (
    <div className="w-full max-w-[640px] p-4 md:p-12 rounded-2xl md:rounded-3xl border border-(--gray-light) shadow-lg shadow-gray-200 flex flex-col gap-4 md:gap-8">
      <h1 className="font-(--font-halvar) text-4xl ">Аккаунт заблокирован</h1>
      <div className="md:py-7 md:px-8 border border-(--gray-light) rounded-xl">
        <p className="text-lg leading-6 font-bold mb-2.5">
          Ваш аккаунт заблокирован
        </p>
        <p>
          Вы можете утонить причину блокировки у справочной службы:
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
    </div>
  );
};

export default ModalBlockedJournalist;
