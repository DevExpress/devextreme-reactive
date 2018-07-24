import { firstRowOnPage, lastRowOnPage } from '@devexpress/dx-grid-core';
import { PageButtons } from './page-buttons';

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
  render() {
    const {
      totalPages,
      currentPage,
      totalCount,
      pageSize,
      getMessage,
    } = this;
    const { currentPageChange: onCurrentPageChange } = this.$listeners;

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
          <PageButtons
            currentPage={currentPage}
            totalPageCount={totalPages}
            currentPageChange={currentPageChange}
          />
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
