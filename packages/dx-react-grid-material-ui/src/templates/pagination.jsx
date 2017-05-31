import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const paginationStyleSheet = createStyleSheet('Pagination', theme => ({
  pagination: {
    float: 'right',
    margin: 0,
    verticalAlign: 'bottom',
  },
  button: {
    minWidth: theme.spacing.unit * 2,
  },
}));

const PageButton = ({ text, isActive, isDisabled, classes, onClick }) => (
  <Button
    className={classes.button}
    accent={isActive}
    raised={isActive}
    disabled={isDisabled}
    onTouchTap={onClick}
  >
    {text}
  </Button>
);

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

const PaginationBase = ({ totalPages, currentPage, onCurrentPageChange, classes }) => (
  <div className={classes.pagination}>
    {renderPageButtons(currentPage, totalPages, classes, onCurrentPageChange)}
  </div>
);

PaginationBase.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Pagination = withStyles(paginationStyleSheet)(PaginationBase);
