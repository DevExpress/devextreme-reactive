import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import withStyles from '@mui/styles/withStyles';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { firstRowOnPage, lastRowOnPage, calculateStartPage } from '@devexpress/dx-grid-core';

const styles = theme => ({
  pagination: {
    margin: 0,
  },
  rowsLabel: {
    ...theme.typography.caption,
    paddingRight: theme.spacing(5),
  },
  button: {
    minWidth: theme.spacing(2),
  },
  activeButton: {
    fontWeight: 'bold',
    cursor: 'default',
  },
  arrowButton: {
    display: 'inline-block',
    transform: theme.direction === 'rtl' ? 'rotate(180deg)' : null,
    msTransform: theme.direction === 'rtl' ? 'rotate(180deg)' : null,
  },
  prev: {
    marginRight: 0,
  },
  next: {
    marginLeft: 0,
  },
  '@media(max-width: 768px)': {
    button: {
      display: 'none',
    },
    prev: {
      marginRight: theme.spacing(1),
    },
    next: {
      marginLeft: theme.spacing(1),
    },
    rowsLabel: {
      paddingRight: theme.spacing(2),
    },
  },
});

const PageButton = ({
  text, isActive, isDisabled, classes, onClick,
}) => {
  const buttonClasses = classNames({
    [classes.button]: true,
    [classes.activeButton]: isActive,
  });

  return (
    <Button
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}
      {...isActive ? { tabIndex: -1 } : null}
    >
      {text}
    </Button>
  );
};

PageButton.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

PageButton.defaultProps = {
  onClick: () => {},
  isDisabled: false,
  isActive: false,
};

const ellipsisSymbol = '\u2026';

const renderPageButtons = (
  currentPage,
  totalPageCount,
  classes,
  onCurrentPageChange,
) => {
  const pageButtons = [];
  const maxButtonCount = 3;
  let startPage = 1;
  let endPage = totalPageCount || 1;

  // NOTE: take into account last button and ellipsis (T1004797)
  if (maxButtonCount < totalPageCount - 2) {
    startPage = calculateStartPage(currentPage + 1, maxButtonCount, totalPageCount);
    endPage = (startPage + maxButtonCount) - 1;
  }
  if (startPage > 1) {
    pageButtons.push((
      <PageButton
        key={1}
        text={String(1)}
        classes={classes}
        onClick={() => onCurrentPageChange(0)}
      />
    ));

    if (startPage > 2) {
      pageButtons.push((
        <PageButton
          key="ellipsisStart"
          text={ellipsisSymbol}
          classes={classes}
          isDisabled
        />
      ));
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pageButtons.push((
      <PageButton
        key={page}
        text={String(page)}
        isActive={page === currentPage + 1}
        classes={classes}
        onClick={() => onCurrentPageChange(page - 1)}
        isDisabled={startPage === endPage}
      />
    ));
  }

  if (endPage < totalPageCount) {
    if (endPage < totalPageCount - 1) {
      pageButtons.push((
        <PageButton
          key="ellipsisEnd"
          text={ellipsisSymbol}
          classes={classes}
          isDisabled
        />
      ));
    }

    pageButtons.push((
      <PageButton
        key={totalPageCount}
        text={String(totalPageCount)}
        classes={classes}
        onClick={() => onCurrentPageChange(totalPageCount - 1)}
      />
    ));
  }

  return pageButtons;
};

const PaginationBase = ({
  totalPages,
  totalCount,
  pageSize,
  currentPage,
  onCurrentPageChange,
  getMessage,
  classes,
}) => {
  const from = firstRowOnPage(currentPage, pageSize, totalCount);
  const to = lastRowOnPage(currentPage, pageSize, totalCount);

  return (
    <div className={classes.pagination}>
      <span className={classes.rowsLabel}>
        {getMessage('info', { from, to, count: totalCount })}
      </span>
      <IconButton
        className={classNames(classes.arrowButton, classes.prev)}
        disabled={currentPage === 0}
        onClick={() => (currentPage > 0) && onCurrentPageChange(currentPage - 1)}
        aria-label="Previous"
        size="large">
        <ChevronLeft />
      </IconButton>
      {renderPageButtons(currentPage, totalPages, classes, onCurrentPageChange)}
      <IconButton
        className={classNames(classes.arrowButton, classes.next)}
        disabled={currentPage === totalPages - 1 || totalCount === 0}
        onClick={() => currentPage < totalPages - 1 && onCurrentPageChange(currentPage + 1)}
        aria-label="Next"
        size="large">
        <ChevronRight />
      </IconButton>
    </div>
  );
};

PaginationBase.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
};

export const Pagination = withStyles(styles, { name: 'Pagination' })(PaginationBase);
