import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

export const Pager = {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    pageSizes: {
      type: Array,
      required: true,
    },
    totalCount: {
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
      currentPage,
      totalPages,
      pageSize,
      pageSizes,
      totalCount,
      getMessage,
    } = this;
    const { pageSizeChange, currentPageChange } = this.$listeners;

    return (
      <div
        class="clearfix card-footer"
        {...this.$attrs}
      >
        {!!pageSizes.length && <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={pageSizeChange}
          pageSizes={pageSizes}
          getMessage={getMessage}
        />}
        <Pagination
          totalPages={totalPages}
          totalCount={totalCount}
          currentPage={currentPage}
          onCurrentPageChange={page => currentPageChange(page)}
          pageSize={pageSize}
          getMessage={getMessage}
        />
      </div>
    );
  },
};
