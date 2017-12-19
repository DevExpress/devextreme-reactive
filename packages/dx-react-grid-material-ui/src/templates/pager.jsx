import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

const styles = theme => ({
  pager: {
    overflow: 'hidden',
    padding: theme.spacing.unit * 1.5,
  },
});

const PagerBase = ({
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
    <Pagination
      totalPages={totalPages}
      totalCount={totalCount}
      currentPage={currentPage}
      onCurrentPageChange={page => onCurrentPageChange(page)}
      pageSize={pageSize}
      getMessage={getMessage}
    />
    {!!pageSizes.length && <PageSizeSelector
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      pageSizes={pageSizes}
      getMessage={getMessage}
    />}
  </div>
);

PagerBase.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

PagerBase.defaultProps = {
  className: undefined,
};


export const Pager = withStyles(styles, { name: 'Pager' })(PagerBase);
