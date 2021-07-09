import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

const styles = theme => ({
  pager: {
    overflow: 'hidden',
    padding: theme.spacing(1.5),
    display: 'flex',
    flex: 'none',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

const PagerBase = ({
  activeButtonClass,
  currentPage,
  pageSizes,
  totalPages,
  pageSize,
  classes,
  onCurrentPageChange,
  onPageSizeChange,
  totalCount,
  getMessage,
  className,
  ...restProps
}) => (
  <div
    className={classNames(classes.pager, className)}
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

PagerBase.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  activeButtonClass: PropTypes.string,
  onCurrentPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

PagerBase.defaultProps = {
  activeButtonClass: '',
  className: undefined,
};

export const Pager = withStyles(styles, { name: 'Pager' })(PagerBase);
