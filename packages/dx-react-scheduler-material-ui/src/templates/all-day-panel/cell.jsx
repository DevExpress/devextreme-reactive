import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import { DropTarget } from '@devexpress/dx-react-core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { getBorder } from '../utils';

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
});

class CellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      over: false,
      payload: {},
      top: undefined,
      part: 0,
    };

    this.cell = React.createRef();

    this.handleDragEvent = (eventHandler, { payload, ...restArgs }) => {
      eventHandler({ payload, ...restArgs });
    };
    this.onEnter = ({ payload, clientOffset, rect }) => {
      // console.log('on enter!');

      const part = (clientOffset.y - this.state.top) / this.cell.current.clientHeight;

      // if (part === 0) {
      //   this.setState({ payload, over: false, top: clientOffset.y, part });
      //   return;
      // }
      // if (part === 1) {
      //   this.setState({ payload, over: false, top: clientOffset.y, part });
      //   return;
      // }
      this.setState({
        payload, over: true, top: clientOffset.y, part,
      });
    };
    this.onOver = ({ clientOffset, payload }) => {
      const { top } = this.state;
      let part = (clientOffset.y - this.state.top) / this.cell.current.clientHeight;
      // console.log(part);

      // if (part === 0) {
      //   this.setState({ payload, over: false, top: clientOffset.y, part });
      //   return;
      // }
      // if (part === 1) {
      //   this.setState({ payload, over: false, top: clientOffset.y, part });
      //   return;
      // }

      let minus = 1;
      if (part < 0) {
        minus *= -1;
      }

      if (Math.abs(part) > 1) {
        this.setState({
          payload: {}, over: false, top: undefined, part: 0,
        });
        return;
      }

      if (part > 0 && part < 0.25) {
        part = 0;
      } else if ((part < 0 && part > -0.25)) {
        part = -0.01;
      } else if (Math.abs(part) < 0.5) {
        part = 0.25 * minus;
      } else if (Math.abs(part) < 0.75) {
        part = 0.5 * minus;
      } else if (Math.abs(part) < 1) {
        part = 0.75 * minus;
      }
      if (part < 0) {
        part = 1 + part;
      }

      // console.log(`${oldPart} -> ${part}`);
      this.setState({ part });

      // payload[0].changeAppointment({
      //   change: {
      //     startDate: this.props.startDate,
      //     endDate: moment(this.props.startDate).add(payload[0].appointmentDuration, 'seconds').toDate(),
      //   },
      // });
    };
    this.onLeave = () => {
      // console.log('on leave!');
      // this.setState({ payload: {}, over: false, top: undefined, part: 0 });
    };
    this.onDrop = (args) => {
      // // console.log('on drop!');
      // args.payload[0].commitChangedAppointment({ appointmentId: args.payload[0].data.id });
      // this.setState({ payload: {}, over: false, top: undefined, part: 0 });
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

    return (
      <DropTarget
        onEnter={args => this.handleDragEvent(this.onEnter, args)}
        onOver={args => this.handleDragEvent(this.onOver, args)}
        onLeave={args => this.handleDragEvent(this.onLeave, args)}
        onDrop={args => this.handleDragEvent(this.onDrop, args)}
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
            {children}
          </TableCell>
        </RootRef>
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
  startDate: undefined,
  endDate: undefined,
  className: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
