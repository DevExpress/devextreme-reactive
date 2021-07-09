import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

export const Pager = ({
  activeButtonClass,
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
  ...restProps
}) => (
  <div
    className={classNames('clearfix panel-footer', className)}
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
      activeButtonClass={activeButtonClass}
    />
  </div>
);

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  activeButtonClass: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Pager.defaultProps = {
  activeButtonClass: '',
  className: undefined,
  style: null,
};
