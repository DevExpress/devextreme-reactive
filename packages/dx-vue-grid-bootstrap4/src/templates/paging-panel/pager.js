import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

export const Pager = {
  props: {
    currentPage: {
      type: Number,
      isRequired: true,
    },
    onCurrentPageChange: {
      type: Function,
      isRequired: true,
    },
    totalPages: {
      type: Number,
      isRequired: true,
    },
    pageSize: {
      type: Number,
      isRequired: true,
    },
    onPageSizeChange: {
      type: Function,
      isRequired: true,
    },
    pageSizes: {
      type: Array,
      isRequired: true,
    },
    totalCount: {
      type: Number,
      isRequired: true,
    },
    getMessage: {
      type: Function,
      isRequired: true,
    },
  },
  render() {
    const {
      currentPage,
      onCurrentPageChange,
      totalPages,
      pageSize,
      onPageSizeChange,
      pageSizes,
      totalCount,
      getMessage,
    } = this;
    return (
      <div
        class="clearfix card-footer"
        {...this.$attrs}
      >
        {!!pageSizes.length && <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
          pageSizes={pageSizes}
          getMessage={getMessage}
        />}
        <Pagination
          totalPages={totalPages}
          totalCount={totalCount}
          currentPage={currentPage}
          onCurrentPageChange={page => onCurrentPageChange(page)}
          pageSize={pageSize}
          getMessage={getMessage}
        />
      </div>
    );
  },
};
