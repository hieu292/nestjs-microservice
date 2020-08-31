import React from 'react';

export interface IPagination {
  page: number;
  pageCount: number;
}

export interface IPaginationProps extends IPagination {
  onPrev: (page: number) => void;
  onNext: (page: number) => void;
  customClass?: string;
}

export const Pagination = ({page, pageCount, onPrev, onNext, customClass}: IPaginationProps) => {
  const prevPage = page - 1;
  const nextPage = page + 1;
  const hasPrev = prevPage > 0;
  const hasNext = nextPage <= pageCount;

  const prev = hasPrev ? (
    <li className="page-item">
      <a
        className="page-link"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onPrev(prevPage);
        }}
      >
        Previous
      </a>
    </li>
  ) : (
    <li className="page-item disabled">
      <span className="page-link">Previous</span>
    </li>
  );

  const next = hasNext ? (
    <li className="page-item">
      <a
        className="page-link"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onNext(nextPage);
        }}
      >
        Next
      </a>
    </li>
  ) : (
    <li className="page-item disabled">
      <span className="page-link">Next</span>
    </li>
  );

  return (
    <nav aria-label="...">
      <ul className={`pagination ${customClass || ''}`}>
        {prev}
        <li className="page-item" aria-current="page">
          <span className="page-link">
            {page}
            <span className="sr-only">(current)</span>
          </span>
        </li>
        {next}
      </ul>
    </nav>
  );
};
