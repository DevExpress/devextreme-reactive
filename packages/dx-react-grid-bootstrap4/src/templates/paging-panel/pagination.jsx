import * as React from 'react';
import * as PropTypes from 'prop-types';
import { firstRowOnPage, lastRowOnPage, calculateStartPage } from '@devexpress/dx-grid-core';
import {
  Pagination as PaginationBS4,
  PaginationLink,
  PaginationItem,
} from '../parts/pagination';

const renderPageButtons = (
  currentPage,
  totalPageCount,
  currentPageChange,
  activeButtonClass,
) => {
  const pageButtons = [];
  const maxButtonCount = 3;
  let startPage = 1;
  let endPage = totalPageCount || 1;

  // NOTE: take into account last button and ellipsis (T1004797)
  if (maxButtonCount < totalPageCount - 2) {
    startPage = calculateStartPage(currentPage + 1, maxButtonCount, totalPageCount);
    endPage = (startPage + maxButtonCount) - 1;
  }
  if (startPage > 1) {
    pageButtons.push((
      <PaginationItem key={1} activeButtonClass={activeButtonClass}>
        <PaginationLink
          href="#"
          onClick={e => currentPageChange(e, 0)}
        >
          {1}
        </PaginationLink>
      </PaginationItem>
    ));

    if (startPage > 2) {
      pageButtons.push((
        <PaginationItem key="ellipsisStart" disabled>
          <PaginationLink>
            {'...'}
          </PaginationLink>
        </PaginationItem>
      ));
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pageButtons.push((
      <PaginationItem
        key={page}
        active={page === currentPage + 1}
        activeButtonClass={activeButtonClass}
        disabled={startPage === endPage}
      >
        <PaginationLink
          href="#"
          onClick={e => currentPageChange(e, page - 1)}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));
  }

  if (endPage < totalPageCount) {
    if (endPage < totalPageCount - 1) {
      pageButtons.push((
        <PaginationItem key="ellipsisEnd" disabled>
          <PaginationLink>
            {'...'}
          </PaginationLink>
        </PaginationItem>
      ));
    }

    pageButtons.push((
      <PaginationItem key={totalPageCount} activeButtonClass={activeButtonClass}>
        <PaginationLink
          href="#"
          onClick={e => currentPageChange(e, totalPageCount - 1)}
        >
          {totalPageCount}
        </PaginationLink>
      </PaginationItem>
    ));
  }

  return pageButtons;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onCurrentPageChange,
  totalCount,
  pageSize,
  getMessage,
  activeButtonClass,
}) => {
  const from = firstRowOnPage(currentPage, pageSize, totalCount);
  const to = lastRowOnPage(currentPage, pageSize, totalCount);
  const currentPageChange = (e, nextPage) => {
    e.preventDefault();
    onCurrentPageChange(nextPage);
  };
  return (
    <React.Fragment>
      <PaginationBS4 className="float-right d-none d-sm-flex" listClassName="m-0">
        <PaginationItem disabled={currentPage === 0}>
          <PaginationLink
            previous
            href="#"
            onClick={e => currentPageChange(e, currentPage - 1)}
          />
        </PaginationItem>
        {renderPageButtons(currentPage, totalPages, currentPageChange, activeButtonClass)}
        <PaginationItem disabled={currentPage === totalPages - 1 || totalCount === 0}>
          <PaginationLink
            next
            href="#"
            onClick={e => currentPageChange(e, currentPage + 1)}
          />
        </PaginationItem>
      </PaginationBS4>

      <PaginationBS4 className="float-right d-sm-none" listClassName="m-0">
        <PaginationItem disabled={currentPage === 0}>
          <PaginationLink
            previous
            href="#"
            onClick={e => currentPageChange(e, currentPage - 1)}
          />
        </PaginationItem>
        &nbsp;
        <PaginationItem disabled={currentPage === totalPages - 1 || totalCount === 0}>
          <PaginationLink
            next
            href="#"
            onClick={e => currentPageChange(e, currentPage + 1)}
          />
        </PaginationItem>
      </PaginationBS4>
      <span className="float-right d-sm-none mr-4">
        <span className="d-inline-block align-middle">
          {getMessage('info', { from, to, count: totalCount })}
        </span>
      </span>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  activeButtonClass: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  activeButtonClass: '',
};
