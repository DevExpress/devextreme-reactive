import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { WEEK_DAY_OPTIONS, DAY_OPTIONS } from '@devexpress/dx-scheduler-core';
import equal from 'deep-equal';
import { getBrightBorder } from '../../../utils';
import { LAYOUT_MEDIA_QUERY } from '../../../constants';

const styles = theme => ({
  cell: {
    userSelect: 'none',
    paddingBottom: theme.spacing(0.5),
    textAlign: 'center',
    borderBottom: 'none',
    paddingRight: 0,
    paddingLeft: 0,
    boxSizing: 'border-box',
    [`${LAYOUT_MEDIA_QUERY}`]: {
      padding: theme.spacing(1),
      paddingBottom: 0,
    },
    '&:only-child': {
      textAlign: 'left',
      paddingLeft: theme.spacing(2),
    },
    paddingTop: theme.spacing(0.5),
  },
  dayOfWeek: {
    ...theme.typography.caption,
    margin: 0,
    color: theme.palette.text.secondary,
    lineHeight: 1.17,
  },
  dayOfMonth: {
    ...theme.typography.h4,
    [`${LAYOUT_MEDIA_QUERY}`]: {
      ...theme.typography.h6,
    },
    color: theme.palette.text.secondary,
    lineHeight: 1.2,
    fontSize: '1.8rem',
  },
  highlightedText: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  dayView: {
    'td:only-child &': {
      textAlign: 'center',
      width: 'auto',
      display: 'inline-block',
    },
  },
  brightRightBorder: {
    borderRight: getBrightBorder(theme),
    '&:last-child': {
      borderRight: 'none',
    },
  },
});

export const deepEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < keysA.length; i += 1) {
    if (!hasOwn.call(objB, keysA[i])) {
      return false;
    }

    const valA = objA[keysA[i]];
    const valB = objB[keysA[i]];

    const a = equal(valA, valB);
    debugger;
    if (a === false) {
      // return false;
    }
    // if (valA === valB) {
    //   continue;
    // }

    // if (valA !== valB) {
    //   return false;
    // }
  }

  return true;
};

const CellBase = React.memo(({
  classes,
  className,
  startDate,
  endDate,
  today,
  formatDate,
  endOfGroup,
  groupingInfo,
  // @deprecated
  hasRightBorder,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.brightRightBorder]: endOfGroup || hasRightBorder,
    }, className)}
    {...restProps}
  >
    <div className={classes.dayView}>
      <p
        className={classNames({
          [classes.dayOfWeek]: true,
          [classes.highlightedText]: today,
        })}
      >
        {formatDate(startDate, WEEK_DAY_OPTIONS)}
      </p>
      <div
        className={classNames({
          [classes.dayOfMonth]: true,
          [classes.highlightedText]: today,
        })}
      >
        {formatDate(startDate, DAY_OPTIONS)}
      </div>
    </div>
  </TableCell>
), deepEqual);

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  today: PropTypes.bool,
  endOfGroup: PropTypes.bool,
  hasRightBorder: PropTypes.bool,
  groupingInfo: PropTypes.arrayOf(PropTypes.object),
};

CellBase.defaultProps = {
  className: undefined,
  endDate: undefined,
  today: false,
  endOfGroup: false,
  hasRightBorder: false,
  groupingInfo: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
