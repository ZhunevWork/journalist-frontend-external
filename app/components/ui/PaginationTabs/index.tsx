import React from 'react';

type PaginationTabsProps = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

function getPages(current: number, total: number): (number | string)[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, '...', total];
  }
  if (current >= total - 2) {
    return [1, '...', total - 2, total - 1, total];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export default function PaginationTabs(props: PaginationTabsProps) {
  const { current, total, onChange } = props;

  const pages = getPages(current, total);

  return (
    <nav className="flex items-center space-x-1">
      <button
        className="h-9 w-9 flex justify-center border border-(--gray-light) items-center rounded-full hover:bg-gray-200 disabled:opacity-20 disabled:border-(--gray) disabled:hover:bg-white transition rotate-180"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        aria-label="Previous"
      >
        <img src="./icons/arrow.svg" alt="arrow" />
      </button>
      {pages.map((page, idx) =>
        page === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 py-1 text-gray-400 select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`h-9 w-9 flex justify-center items-center rounded-full transition border border-(--gray-light)
              ${
                page === current
                  ? 'text-black'
                  : 'hover:bg-blue-100 text-(--txt-secondary)'
              }
            `}
            onClick={() => onChange(page as number)}
            disabled={page === current}
          >
            {page}
          </button>
        ),
      )}
      <button
        className="h-9 w-9 flex justify-center border border-(--gray-light) items-center rounded-full hover:bg-gray-200 disabled:opacity-20 disabled:border-(--gray) disabled:hover:bg-white transition"
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        aria-label="Next"
      >
        <img src="./icons/arrow.svg" alt="arrow" />
      </button>
    </nav>
  );
}
