import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, IconButton } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';

export const paginationStyleSheet = createStyleSheet('Pagination', theme => ({
  pagination: {
    float: 'right',
    margin: 0,
  },
  rowsLabel: {
    ...theme.typography.caption,
    paddingRight: theme.spacing.unit * 5,
  },
  button: {
    minWidth: theme.spacing.unit * 2,
    height: theme.spacing.unit * 5,
  },
  activeButton: {
    fontWeight: 'bold',
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
}));

const PageButton = ({ text, isActive, isDisabled, classes, onClick }) => {
  const buttonClasses = classNames({
    [classes.button]: true,
    [classes.activeButton]: isActive,
  });

  return (<Button
    className={buttonClasses}
    disabled={isDisabled}
    onTouchTap={onClick}
  >
    {text}
  </Button>);
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

const calculateStartPage = (currentPage, maxButtonCount, totalPageCount) => Math.max(
  Math.min(
    currentPage - Math.floor(maxButtonCount / 2, 10), (totalPageCount - maxButtonCount) + 1,
  ),
  1,
);

const renderPageButtons = (
  currentPage,
  totalPageCount,
  classes,
  onCurrentPageChange,
  ) => {
  const pageButtons = [];
  const maxButtonCount = 3;
  let startPage = 1;
  let endPage = totalPageCount;

  if (maxButtonCount < totalPageCount) {
    startPage = calculateStartPage(currentPage, maxButtonCount, totalPageCount);
    endPage = (startPage + maxButtonCount) - 1;
  }
  if (startPage > 1) {
    pageButtons.push(
      <PageButton
        key={1}
        text={String(1)}
        classes={classes}
        onClick={() => onCurrentPageChange(1)}
      />,
    );

    if (startPage > 2) {
      pageButtons.push(
        <PageButton
          key={'ellipsisStart'}
          text={ellipsisSymbol}
          classes={classes}
          isDisabled
        />,
      );
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pageButtons.push(
      <PageButton
        key={page}
        text={String(page)}
        isActive={page === currentPage}
        classes={classes}
        onClick={() => onCurrentPageChange(page)}
      />,
    );
  }

  if (endPage < totalPageCount) {
    if (endPage < totalPageCount - 1) {
      pageButtons.push(
        <PageButton
          key={'ellipsisEnd'}
          text={ellipsisSymbol}
          classes={classes}
          isDisabled
        />,
      );
    }

    pageButtons.push(
      <PageButton
        key={totalPageCount}
        text={String(totalPageCount)}
        classes={classes}
        onClick={() => onCurrentPageChange(totalPageCount)}
      />,
    );
  }

  return pageButtons;
};

const PaginationBase = ({
  totalPages,
  totalCount,
  firstRowIndex,
  lastRowIndex,
  currentPage,
  onCurrentPageChange,
  classes,
}) => (
  <div className={classes.pagination}>
    <span className={classes.rowsLabel}>
      { String(firstRowIndex) }
      -
      { String(lastRowIndex) } of {String(totalCount)}
    </span>
    <IconButton
      className={classNames(classes.arrowButton, classes.prev)}
      disabled={currentPage === 1}
      onTouchTap={() => currentPage > 1 && onCurrentPageChange(currentPage - 1)}
    >
      <ChevronLeft />
    </IconButton>
    {renderPageButtons(currentPage, totalPages, classes, onCurrentPageChange)}
    <IconButton
      className={classNames(classes.arrowButton, classes.next)}
      disabled={currentPage === totalPages}
      onTouchTap={() => currentPage < totalPages && onCurrentPageChange(currentPage + 1)}
    >
      <ChevronRight />
    </IconButton>
  </div>
);

PaginationBase.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  firstRowIndex: PropTypes.number.isRequired,
  lastRowIndex: PropTypes.number.isRequired,
};

export const Pagination = withStyles(paginationStyleSheet)(PaginationBase);
