import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { Button, IconButton, styled } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { firstRowOnPage, lastRowOnPage, calculateStartPage } from '@devexpress/dx-grid-core';

const PREFIX = 'Pagination';
export const classes = {
  button: `${PREFIX}-button`,
  activeButton: `${PREFIX}-activeButton`,
  text: `${PREFIX}-text`,
  pagination: `${PREFIX}-pagination`,
  rowsLabel: `${PREFIX}-rowsLabel`,
};
const StyledButton = styled(Button)(({ theme }) => ({
  [`&.${classes.button}`]: {
    minWidth: theme.spacing(2),
  },
  [`&.${classes.activeButton}`]: {
    fontWeight: 'bold',
    cursor: 'default',
  },
  [`&.${classes.text}`]: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
  '@media(max-width: 768px)': {
    [`&.${classes.button}`]: {
      display: 'none',
    },
  },
}));

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.pagination}`]: {
    margin: 0,
  },
  [`& .${classes.rowsLabel}`]: {
    ...theme.typography.caption,
    paddingRight: theme.spacing(5),
  },
  [`& .${classes.arrowButton}`]: {
    display: 'inline-block',
    transform: theme.direction === 'rtl' ? 'rotate(180deg)' : null,
    msTransform: theme.direction === 'rtl' ? 'rotate(180deg)' : null,
  },
  [`& .${classes.prev}`]: {
    marginRight: 0,
  },
  [`& .${classes.next}`]: {
    marginLeft: 0,
  },
  '@media(max-width: 768px)': {
    [`& .${classes.rowsLabel}`]: {
      paddingRight: theme.spacing(2),
    },
    [`& .${classes.prev}`]: {
      marginRight: theme.spacing(1),
    },
    [`& .${classes.next}`]: {
      marginLeft: theme.spacing(1),
    },
  },
}));

const PageButton = ({
  text, isActive, isDisabled, onClick,
}) => {
  const buttonClasses = classNames({
    [classes.button]: true,
    [classes.activeButton]: isActive,
    [classes.text]: true,
  });

  return (
    <StyledButton
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}
      {...isActive ? { tabIndex: -1 } : null}
    >
      {text}
    </StyledButton>
  );
};

PageButton.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

PageButton.defaultProps = {
  onClick: () => {},
  isDisabled: false,
  isActive: false,
};

const ellipsisSymbol = '\u2026';

const RenderPageButtons = (
  currentPage,
  totalPageCount,
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
        onClick={() => onCurrentPageChange(0)}
      />
    ));

    if (startPage > 2) {
      pageButtons.push((
        <PageButton
          key="ellipsisStart"
          text={ellipsisSymbol}
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

export const Pagination = ({
  totalPages,
  totalCount,
  pageSize,
  currentPage,
  onCurrentPageChange,
  getMessage,
}) => {
  const from = firstRowOnPage(currentPage, pageSize, totalCount);
  const to = lastRowOnPage(currentPage, pageSize, totalCount);

  return (
    <StyledDiv className={classes.pagination}>
      <span className={classes.rowsLabel}>
        {getMessage('info', { from, to, count: totalCount })}
      </span>
      <IconButton
        className={classNames(classes.arrowButton, classes.prev)}
        disabled={currentPage === 0}
        onClick={() => (currentPage > 0) && onCurrentPageChange(currentPage - 1)}
        aria-label="Previous"
        size="large"
      >
        <ChevronLeft />
      </IconButton>
      {RenderPageButtons(currentPage, totalPages, onCurrentPageChange)}
      <IconButton
        className={classNames(classes.arrowButton, classes.next)}
        disabled={currentPage === totalPages - 1 || totalCount === 0}
        onClick={() => currentPage < totalPages - 1 && onCurrentPageChange(currentPage + 1)}
        aria-label="Next"
        size="large"
      >
        <ChevronRight />
      </IconButton>
    </StyledDiv>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
};
