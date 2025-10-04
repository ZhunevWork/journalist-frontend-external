import type { IAccreditation } from '~/api/controllers/accreditation/types';
import CardWrapper from '~/components/Card/CardWrapper';
import dayjs from 'dayjs';

interface CardAccreditationProps {
  data: IAccreditation;
}

export default function CardAccreditation(props: CardAccreditationProps) {
  const { data } = props;

  const getStatus = () => {
    if (data.is_approved_by_ps && data.is_approved_by_ss) {
      return {
        url: './icons/status/approve.svg',
        text: 'Одобрено',
        color: 'var(--status-success)',
      };
    }
    if (data.is_approved_by_ps === false || data.is_approved_by_ss === false) {
      return {
        url: './icons/status/reject.svg',
        text: 'Отклонено',
        color: 'var(--status-alert)',
      };
    }
    return {
      url: './icons/clock.svg',
      text: 'На согласовании',
      color: 'black',
    };
  };

  return (
    <CardWrapper>
      <h4 className="text-lg mb-1 md:mb-2.5">{data.event.name}</h4>
      <p className="mb-4 ">
        {dayjs(data.event.date).format('D.MM dd, HH:mm')} — {data.event.type}
      </p>

      <h4 className="flex items-center gap-2 mb-1 md:mb-3">
        {data.is_approved_by_ps && data.is_approved_by_ss}
        <img src={getStatus().url} alt="clock" />
        <span style={{ color: getStatus().color }}>{getStatus().text}</span>
      </h4>
      <span className="flex items-center gap-2">
        <img src="./icons/location.svg" alt="location" />
        {data.event.location}
      </span>
    </CardWrapper>
  );
}
