import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { DropTarget } from '@devexpress/dx-react-core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { getBorder } from '../../../utils';
import { VerticalAppointment } from '../../../appointment/vertical-appointment';

const styles = theme => ({
  cell: {
    borderLeft: getBorder(theme),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  dragging: {
    position: 'relative',
  },
  appointment: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    borderRight: '1px solid transparent',
    borderBottom: '1px solid transparent',
    backgroundClip: 'padding-box',
    borderRadius: theme.spacing.unit / 2,
    backgroundColor: theme.palette.primary[300],
    ...theme.typography.caption,
    top: 0,
    left: 0,
    position: 'absolute',
    background: 'blue',
    width: '100%',
    zIndex: 100,
  },
  clickableAppointment: {
    cursor: 'pointer',
  },
});

class CellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      over: false,
      payload: {},
    };

    this.handleDragEvent = (eventHandler, { payload, ...restArgs }) => {
      eventHandler({ payload, ...restArgs });
    };
    this.onEnter = ({ payload }) => {
      // console.log('on enter!');
      payload[0].changeAppointment({
        change: {
          startDate: this.props.startDate,
          endDate: moment(this.props.startDate).add(payload[0].appointmentDuration, 'seconds').toDate(),
        },
      });
      this.setState({ payload, over: true });
    };
    this.onOver = ({ clientOffset }) => {
      // console.log('on over!');
    };
    this.onLeave = () => {
      // console.log('on leave!');
      this.setState({ payload: {}, over: false });
    };
    this.onDrop = (args) => {
      // console.log('on drop!');
      args.payload[0].commitChangedAppointment({ appointmentId: args.payload[0].data.id });
      this.setState({ payload: {}, over: false });
    };
    this.onDragStart = (columnName) => {
      this.draggingColumnName = columnName;
    };
    this.onDragEnd = () => {
      this.draggingColumnName = null;
      const { sourceColumnName, targetItemIndex } = this.state;
      const { onGroup } = this.props;
      if (sourceColumnName && targetItemIndex === -1) {
        onGroup({
          columnName: sourceColumnName,
        });
      }
      this.resetState();
    };
  }

  render() {
    const {
      classes,
      className,
      children,
      startDate,
      endDate,
      ...restProps
    } = this.props;
    const { over, payload } = this.state;
    return (
      <DropTarget
        onEnter={args => this.handleDragEvent(this.onEnter, args)}
        onOver={args => this.handleDragEvent(this.onOver, args)}
        onLeave={args => this.handleDragEvent(this.onLeave, args)}
        onDrop={args => this.handleDragEvent(this.onDrop, args)}
      >
        <TableCell
          tabIndex={0}
          className={classNames({
            [classes.cell]: true,
            [classes.dragging]: over,
            className,
          })}
          {...restProps}
        >
          {children}
          {over && (
            <Paper
              className={classes.appointment}
              style={{
                height: payload[0].style.height,
              }}
            >
              <VerticalAppointment
                data={{
                  ...payload[0].data,
                  startDate,
                  endDate: moment(startDate).add(payload[0].appointmentDuration, 'seconds').toDate(),
                }}
              />
            </Paper>
          )}
        </TableCell>
      </DropTarget>
    );
  }
}

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  children: PropTypes.node,
  className: PropTypes.string,
};

CellBase.defaultProps = {
  children: null,
  className: undefined,
  startDate: undefined,
  endDate: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
