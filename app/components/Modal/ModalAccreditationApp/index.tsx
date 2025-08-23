import ModalWrapper, {
  type ModalWrapperProps,
} from '~/components/Modal/ModalWrapper';

export default function ModalAccreditationApp(props: ModalWrapperProps) {
  const { title, open, onClose, children } = props;

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title={'Заявка "Россия. Премьер-лига, Тур  15"'}
    >
      {children}
      asas
    </ModalWrapper>
  );
}
