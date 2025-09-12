import type { IEvent } from '~/api/controllers/events/types';
import FormAccreditationApp from '~/components/Form/FormAccreditationApp';
import ListAccreditationApps from '~/components/List/ListAccreditationApps';
import ModalWrapper, {
  type ModalWrapperProps,
} from '~/components/Modal/ModalWrapper';
import DateTabs from '~/components/ui/DateTabs';
import type { Dayjs } from 'dayjs';

interface ModalCellAccreditationAppProps extends ModalWrapperProps {
  date: Dayjs;
  events: IEvent[];
}

export default function ModalCellAccreditationApp(
  props: ModalCellAccreditationAppProps,
) {
  const { events, date, open, onClose, children } = props;

  if (!open) return null;

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title={<DateTabs date={date.format('DD MMMM YYYY')} />}
      classNames="lg:max-w-[1080px]"
      styles={{ backgroundColor: 'var(--bg-secondary)', maxHeight: 'none' }}
    >
      <div className="flex gap-8 max-h-[600px]">
        <ListAccreditationApps events={events} />

        <FormAccreditationApp />
      </div>
    </ModalWrapper>
  );
}
