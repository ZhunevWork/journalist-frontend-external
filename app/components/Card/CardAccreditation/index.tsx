import CardWrapper from '~/components/Card/CardWrapper';
import ModalAccreditationApp from '~/components/Modal/ModalCellAccreditationApp';
import { useState } from 'react';

export default function CardAccreditation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CardWrapper onClick={() => setOpen(true)}>
        <h4 className="text-lg mb-1 md:mb-2.5">
          Россия. Премьер-лига, Тур 15{' '}
        </h4>
        <p className="mb-4 ">9.12 чт, 23:00 - Матч</p>

        <h4 className="flex items-center gap-2 mb-1 md:mb-3">
          <img src="./icons/clock.svg" alt="clock" />
          На рассмотрении
        </h4>
        <span className="flex items-center gap-2">
          <img src="./icons/location.svg" alt="location" />
          РЖД Аренда
        </span>
      </CardWrapper>

      <ModalAccreditationApp
        title="Ssasas"
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
