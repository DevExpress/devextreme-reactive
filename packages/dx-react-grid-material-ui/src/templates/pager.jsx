import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

const styleSheet = createStyleSheet('Pager', () => ({
  pager: {
    overflow: 'hidden',
  },
}));

const PagerBase = ({
  currentPage,
  allowedPageSizes,
  totalPages,
  pageSize,
  classes,
  onCurrentPageChange,
  onPageSizeChange,
  totalCount,
  }) => (
    <div className={classes.pager}>
      <Pagination
        totalPages={totalPages}
        totalCount={totalCount}
        currentPage={currentPage}
        onCurrentPageChange={page => onCurrentPageChange(page)}
        pageSize={pageSize}
      />
      {!!allowedPageSizes.length && <PageSizeSelector
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        allowedPageSizes={allowedPageSizes}
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
};

export const Pager = withStyles(styleSheet)(PagerBase);
