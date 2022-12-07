import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

const PREFIX = 'Pager';
export const classes = {
  pager: `${PREFIX}-pager`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.pager}`]: {
    overflow: 'hidden',
    padding: theme.spacing(1.5),
    display: 'flex',
    flex: 'none',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

const PagerBase = ({
  currentPage,
  pageSizes,
  totalPages,
  pageSize,
  onCurrentPageChange,
  onPageSizeChange,
  totalCount,
  getMessage,
  className,
  forwardedRef,
  ...restProps
}) => (
  <StyledDiv
    className={classNames(classes.pager, className)}
    ref={forwardedRef}
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
  </StyledDiv>
);

PagerBase.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.func,
};

PagerBase.defaultProps = {
  className: undefined,
  forwardedRef: undefined,
};

export const Pager = withKeyboardNavigation('paging', 'none')(PagerBase);
