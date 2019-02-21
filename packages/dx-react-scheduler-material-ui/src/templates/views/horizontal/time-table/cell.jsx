import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import { DropTarget } from '@devexpress/dx-react-core';
import { getBorder } from '../../../utils';

const styles = theme => ({
  cell: {
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  text: {
    padding: theme.spacing.unit,
  },
  today: {
    margin: theme.spacing.unit / 2,
    display: 'inline-block',
    width: `${theme.spacing.unit * 3}px`,
    height: `${theme.spacing.unit * 3}px`,
    lineHeight: `${theme.spacing.unit * 3}px`,
    textAlign: 'center',
    borderRadius: '50%',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: 'default',
  },
  otherMonth: {
    color: theme.palette.text.disabled,
  },
});

class CellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.cell = React.createRef();
  }

  render() {
    const {
      classes,
      className,
      startDate,
      endDate,
      today,
      otherMonth,
      ...restProps
    } = this.props;

    return (
      <DropTarget
        sourcePayload={{
          startDate, endDate, cellRef: this.cell, type: 'horizontal',
        }}
      >
        <RootRef rootRef={this.cell}>
          <TableCell
            tabIndex={0}
            className={classNames(classes.cell, className)}
            {...restProps}
          >
            <div
              className={classNames({
                [classes.text]: !today,
                [classes.today]: today,
                [classes.otherMonth]: otherMonth && !today,
              })}
            >
              {moment(startDate).format('D')}
            </div>
          </TableCell>
        </RootRef>
      </DropTarget>
    );
  }
}

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  today: PropTypes.bool,
  otherMonth: PropTypes.bool,
};

CellBase.defaultProps = {
  endDate: undefined,
  className: undefined,
  today: false,
  otherMonth: false,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
