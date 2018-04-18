import { firstRowOnPage, lastRowOnPage, calculateStartPage } from '@devexpress/dx-grid-core';

const renderPageButtons = (
  currentPage,
  totalPageCount,
  currentPageChange,
  /* eslint-disable-next-line no-unused-vars */
  h,
) => {
  const pageButtons = [];
  const maxButtonCount = 3;
  let startPage = 1;
  let endPage = totalPageCount || 1;

  if (maxButtonCount < totalPageCount) {
    startPage = calculateStartPage(currentPage + 1, maxButtonCount, totalPageCount);
    endPage = (startPage + maxButtonCount) - 1;
  }
  if (startPage > 1) {
    pageButtons.push((
      <li class="page-item" key={1}>
        <a
          class="page-link"
          href="#"
          onClick={e => currentPageChange(e, 0)}
        >
          {1}
        </a>
      </li>
    ));

    if (startPage > 2) {
      pageButtons.push((
        <li class="page-item disabled" key="ellipsisStart" disabled>
          <a class="page-link">
            {'...'}
          </a>
        </li>
      ));
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pageButtons.push((
      <li
        key={page}
        class={{
          'page-item': true,
          active: page === currentPage + 1,
          disabled: startPage === endPage,
        }}
      >
        <a
          class="page-link"
          href="#"
          onClick={e => currentPageChange(e, page - 1)}
        >
          {page}
        </a>
      </li>
    ));
  }

  if (endPage < totalPageCount) {
    if (endPage < totalPageCount - 1) {
      pageButtons.push((
        <li class="page-item disabled" key="ellipsisEnd" disabled>
          <a class="page-link" >
            {'...'}
          </a>
        </li>
      ));
    }

    pageButtons.push((
      <li class="page-item" key={totalPageCount}>
        <a
          class="page-link"
          href="#"
          onClick={e => currentPageChange(e, totalPageCount - 1)}
        >
          {totalPageCount}
        </a>
      </li>
    ));
  }

  return pageButtons;
};

export const Pagination = {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    getMessage: {
      type: Function,
      required: true,
    },
  },
  functional: true,
  render(h, context) {
    const {
      totalPages,
      currentPage,
      totalCount,
      pageSize,
      getMessage,
    } = context.props;
    const { currentPageChange: onCurrentPageChange } = context.listeners;

    const from = firstRowOnPage(currentPage, pageSize, totalCount);
    const to = lastRowOnPage(currentPage, pageSize, totalCount);
    const currentPageChange = (e, nextPage) => {
      e.preventDefault();
      onCurrentPageChange(nextPage);
    };

    return (
      <div class="d-inline-block float-right">
        <ul class="pagination float-right d-none d-sm-flex m-0">
          <li class={{
            'page-item': true,
            disabled: currentPage === 0,
          }}>
            <a
              class="page-link"
              aria-label="Previous"
              href="#"
              onClick={e => currentPageChange(e, currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {renderPageButtons(currentPage, totalPages, currentPageChange, h)}
          <li class={{
            'page-item': true,
            disabled: currentPage === totalPages - 1 || totalCount === 0,
          }}>
            <a
              class="page-link"
              aria-label="Next"
              href="#"
              onClick={e => currentPageChange(e, currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>

        <ul class="pagination float-right d-sm-none m-0">
          <li class={{
            'page-item': true,
            disabled: currentPage === 0,
          }}
          >
            <a
              class="page-link"
              aria-label="Previous"
              href="#"
              onClick={e => currentPageChange(e, currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          &nbsp;
        <li class={{
            'page-item': true,
            disabled: currentPage === totalPages - 1 || totalCount === 0,
          }}
          >
            <a
              class="page-link"
              aria-label="Next"
              href="#"
              onClick={e => currentPageChange(e, currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
        <span class="float-right d-sm-none mr-4">
          <span class="d-inline-block align-middle">
            {getMessage('info', { from, to, count: totalCount })}
          </span>
        </span>
      </div>
    );
  },
};
