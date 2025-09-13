import CardAccreditation from '~/components/Card/CardAccreditation';
import ModalWrapper, {
  type ModalWrapperProps,
} from '~/components/Modal/ModalWrapper';
import Input from '~/components/ui/Input';
import PaginationTabs from '~/components/ui/PaginationTabs';
import { useState } from 'react';

export default function ModalRejectedAccreditations(props: ModalWrapperProps) {
  const [page, setPage] = useState(1);

  const { open, onClose } = props;

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Отклоненные"
      classNames="lg:max-w-fit lg:max-h-fit"
    >
      <Input label="Поиск" classNames="mb-7" />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-11 w-full">
        {/* <DatePicker label="Дата" classNames="mb-7" /> */}

        <CardAccreditation />
        <CardAccreditation />
        <CardAccreditation />
        <CardAccreditation />
      </div>

      <div className="flex justify-center">
        <PaginationTabs current={page} total={12} onChange={setPage} />
      </div>
    </ModalWrapper>
  );
}
