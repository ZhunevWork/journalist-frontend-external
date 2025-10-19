interface CardWrapperProps {
  children: React.ReactNode;
  onClick?: () => void;
  read_at?: string | null;
  isNotification?: boolean
}

export default function CardWrapper(props: CardWrapperProps) {
  const { children, onClick, read_at, isNotification = false } = props;

  return (
    <div
      className={`md:px-8 md:py-6.5 p-3 ${!read_at && isNotification ? `border-black` : `border-(--gray-light)`}  bg-white border border-(--gray-light) rounded-xl md:min-w-96`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
