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
  showAllText,
  rowsPerPageText,
  infoText,
}) => (
  <div className={classes.pager}>
    <Pagination
      totalPages={totalPages}
      totalCount={totalCount}
      currentPage={currentPage}
      onCurrentPageChange={page => onCurrentPageChange(page)}
      pageSize={pageSize}
      infoText={infoText}
    />
    {!!allowedPageSizes.length && <PageSizeSelector
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      allowedPageSizes={allowedPageSizes}
      showAllText={showAllText}
      rowsPerPageText={rowsPerPageText}
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
  showAllText: PropTypes.string,
  rowsPerPageText: PropTypes.string,
  infoText: PropTypes.string,
};

PagerBase.defaultProps = {
  showAllText: undefined,
  rowsPerPageText: undefined,
  infoText: undefined,
};

export const Pager = withStyles(styles, { name: 'Pager' })(PagerBase);
