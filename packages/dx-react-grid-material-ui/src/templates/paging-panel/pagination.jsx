import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { firstRowOnPage, lastRowOnPage, calculateStartPage } from '@devexpress/dx-grid-core';

const styles = theme => ({
  pagination: {
    float: 'right',
    margin: 0,
  },
  rowsLabel: {
    ...theme.typography.caption,
    paddingRight: theme.spacing.unit * 5,
    lineHeight: `${theme.spacing.unit * 5}px`,
  },
  button: {
    minWidth: theme.spacing.unit * 2,
    height: theme.spacing.unit * 5,
  },
  activeButton: {
    fontWeight: 'bold',
    cursor: 'default',
  },
  arrowButton: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
    display: 'inline-block',
    verticalAlign: 'middle',
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
      marginRight: theme.spacing.unit,
    },
    next: {
      marginLeft: theme.spacing.unit,
    },
    rowsLabel: {
      paddingRight: theme.spacing.unit * 2,
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
      disableRipple={isActive}
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

  if (maxButtonCount < totalPageCount) {
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
      >
        <ChevronLeft />
      </IconButton>
      {renderPageButtons(currentPage, totalPages, classes, onCurrentPageChange)}
      <IconButton
        className={classNames(classes.arrowButton, classes.next)}
        disabled={currentPage === totalPages - 1 || totalCount === 0}
        onClick={() => currentPage < totalPages - 1 && onCurrentPageChange(currentPage + 1)}
      >
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
