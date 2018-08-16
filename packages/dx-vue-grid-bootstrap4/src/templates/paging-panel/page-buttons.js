import { calculateStartPage } from '@devexpress/dx-grid-core';

export const PageButtons = {
  name: 'PageButtons',
  functional: true,
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPageCount: {
      type: Number,
      required: true,
    },
    currentPageChange: {
      type: Function,
      required: true,
    },
  },
  render(h, context) {
    const { totalPageCount, currentPage, currentPageChange } = context.props;

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
  },
};
