import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

const styles = {
  pager: {
    overflow: 'hidden',
  },
};

const PagerBase = ({
  currentPage,
  allowedPageSizes,
  totalPages,
  pageSize,
  classes,
  onCurrentPageChange,
  onPageSizeChange,
  totalCount,
  showAll,
  rowsPerPage,
  info,
}) => (
  <div className={classes.pager}>
    <Pagination
      totalPages={totalPages}
      totalCount={totalCount}
      currentPage={currentPage}
      onCurrentPageChange={page => onCurrentPageChange(page)}
      pageSize={pageSize}
      info={info}
    />
    {!!allowedPageSizes.length && <PageSizeSelector
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      allowedPageSizes={allowedPageSizes}
      showAll={showAll}
      rowsPerPage={rowsPerPage}
    />}
  </div>
);

PagerBase.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  showAll: PropTypes.string,
  rowsPerPage: PropTypes.string,
  info: PropTypes.string,
};

PagerBase.defaultProps = {
  showAll: undefined,
  rowsPerPage: undefined,
  info: undefined,
};

export const Pager = withStyles(styles, { name: 'Pager' })(PagerBase);
