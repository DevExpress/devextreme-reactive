import React from 'react';
import PropTypes from 'prop-types';
import { TableSortLabel } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  sortingControl: {
    cursor: 'pointer',
    display: 'inline-block',
    paddingTop: theme.spacing.unit / 2,
  },
  sortingTitle: {
    lineHeight: '18px',
    display: 'inline-block',
    verticalAlign: 'top',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});

const SortingControlBase = ({ align, sortingDirection, columnTitle, classes }) =>
  (align === 'right' ? (
    <span className={classes.sortingControl}>
      {!!sortingDirection && <TableSortLabel
        active={!!sortingDirection}
        direction={sortingDirection}
      />}
      <span className={classes.sortingTitle}>
        {columnTitle}
      </span>
    </span>
  ) : (
    <span className={classes.sortingControl}>
      <span className={classes.sortingTitle}>
        {columnTitle}
      </span>
      <TableSortLabel
        active={!!sortingDirection}
        direction={sortingDirection}
      />
    </span>
  ));

SortingControlBase.propTypes = {
  align: PropTypes.string.isRequired,
  sortingDirection: PropTypes.oneOf(['asc', 'desc']),
  columnTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

SortingControlBase.defaultProps = {
  sortingDirection: null,
};

export const SortingControl = withStyles(styles, { name: 'SortingControl' })(SortingControlBase);
