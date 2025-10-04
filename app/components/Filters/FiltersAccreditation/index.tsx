import ModalRejectedAccreditations from '~/components/Modal/ModalRejectedAccreditations';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { useChangeParam } from '~/hooks/useSearch';
import { getAccreditationsByStatus } from '~/utils/getAccreditationsByStatus';
import { useEffect, useState } from 'react';

interface FilterAccreditationsProps {
  children?: React.ReactNode;
}

export default function FilterAccreditations(props: FilterAccreditationsProps) {
  const { children } = props;

  const [modalRejectAccreditationsOpen, setModalRejectAccreditationsOpen] =
    useState<boolean>(false);
  const { changeParam, removeParam } = useChangeParam();

  const rejectedData = getAccreditationsByStatus('rejected');

  const onRejectModalClose = () => {
    setModalRejectAccreditationsOpen(false);
    removeParam('search');
  };

  return (
    <div className="flex flex-wrap gap-4 md:mb-11 mb-4 sm:justify-start justify-end">
      <Input
        label="Поиск"
        iconRight={<img src="/icons/search.svg" alt="Search Icon" />}
        classNames="flex-1 max-w-[492px] min-w-[300px]"
        onChange={e => changeParam('search', e.target.value)}
      />
      {/* <Select label="Сортировка" />
      <Select label="Все события" />
      <Select label="Все локации" /> */}
      {/* <DatePicker label="За всё время" classNames="flex-1 max-w-[492px]" /> */}
      <Button
        onClick={() => setModalRejectAccreditationsOpen(true)}
        disabled={rejectedData.length === 0}
      >
        Отклоненные
      </Button>
      {children}

      <ModalRejectedAccreditations
        open={modalRejectAccreditationsOpen}
        onClose={onRejectModalClose}
      />
    </div>
  );
}
