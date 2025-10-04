import CardAccreditation from '~/components/Card/CardAccreditation';
import ModalWrapper, {
  type ModalWrapperProps,
} from '~/components/Modal/ModalWrapper';
import Input from '~/components/ui/Input';
import PaginationTabs from '~/components/ui/PaginationTabs';
import { useFilteredData } from '~/hooks/useFilteredData';
import { useChangeParam } from '~/hooks/useSearch';
import { getAccreditationsByStatus } from '~/utils/getAccreditationsByStatus';
import { useState } from 'react';

export default function ModalRejectedAccreditations(props: ModalWrapperProps) {
  const { open, onClose } = props;

  const [page, setPage] = useState(1);
  const { getParam } = useChangeParam();
  const { filterByField } = useFilteredData();

  const searchQuery = getParam('search') || '';

  const accreditations = getAccreditationsByStatus('rejected');
  const filteredAccreditations = filterByField(
    accreditations,
    searchQuery,
    accreditation => accreditation.event.name,
  );

  if (!accreditations) {
    return null;
  }

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
        {filteredAccreditations?.map(item => (
          <CardAccreditation key={item.id} data={item} />
        ))}
      </div>

      <div className="flex justify-center">
        <PaginationTabs
          current={page}
          total={filteredAccreditations?.length / 6}
          onChange={setPage}
        />
      </div>
    </ModalWrapper>
  );
}
