import ModalRejectedAccreditations from '~/components/Modal/ModalRejectedAccreditations';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { useState } from 'react';

interface FilterAccreditationsProps {
  children?: React.ReactNode;
}

export default function FilterAccreditations(props: FilterAccreditationsProps) {
  const { children } = props;

  const [modalRejectAccreditationsOpen, setModalRejectAccreditationsOpen] =
    useState<boolean>(false);

  return (
    <div className="flex flex-wrap gap-4 mb-11">
      <Input
        label="Поиск"
        iconRight={<img src="/icons/search.svg" alt="Search Icon" />}
        classNames="flex-1 max-w-[492px]"
      />
      {/* <Select label="Сортировка" />
      <Select label="Все события" />
      <Select label="Все локации" /> */}
      {/* <DatePicker label="За всё время" classNames="flex-1 max-w-[492px]" /> */}
      <Button onClick={() => setModalRejectAccreditationsOpen(true)}>
        Отклоненные
      </Button>
      {children}

      <ModalRejectedAccreditations
        open={modalRejectAccreditationsOpen}
        onClose={() => setModalRejectAccreditationsOpen(false)}
      />
    </div>
  );
}
