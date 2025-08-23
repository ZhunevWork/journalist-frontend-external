interface CardWrapperProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function CardWrapper(props: CardWrapperProps) {
  const { children, onClick } = props;

  return (
    <div
      className="md:px-8 md:py-6.5 p-3 bg-white border border-(--gray-light) rounded-xl md:min-w-96"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
