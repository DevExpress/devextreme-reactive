import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

const PagerBase = ({
  currentPage,
  onCurrentPageChange,
  totalPages,
  pageSize,
  onPageSizeChange,
  pageSizes,
  totalCount,
  getMessage,
  className,
  style,
  forwardedRef,
  ...restProps
}) => (
  <div
    className={classNames('clearfix panel-footer', className)}
    ref={forwardedRef}
    style={{
      flex: 'none',
      ...style,
    }}
    {...restProps}
  >
    {!!pageSizes.length && (
    <PageSizeSelector
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      pageSizes={pageSizes}
      getMessage={getMessage}
    />
    )}
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

PagerBase.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  totalCount: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  forwardedRef: PropTypes.object,
};

PagerBase.defaultProps = {
  className: undefined,
  style: null,
  forwardedRef: undefined,
};

export const Pager = withKeyboardNavigation('paging', 'none')(PagerBase);
