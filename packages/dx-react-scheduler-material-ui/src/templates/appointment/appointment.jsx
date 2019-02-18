import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { DragSource } from '@devexpress/dx-react-core';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ palette, typography, spacing }) => ({
  appointment: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    borderRight: '1px solid transparent',
    borderBottom: '1px solid transparent',
    backgroundClip: 'padding-box',
    borderRadius: spacing.unit / 2,
    backgroundColor: palette.primary[300],
    ...typography.caption,
    '&:hover': {
      backgroundColor: palette.primary[400],
    },
    '&:focus': {
      backgroundColor: palette.primary[100],
      outline: 0,
    },
  },
  clickableAppointment: {
    cursor: 'pointer',
  },
  dragging: {
    opacity: 0.5,
  },
});

class AppointmentBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      initialY: null,
    };
    this.appointmentRef = React.createRef();

    this.onDragStart = ({ clientOffset }) => {
      this.setState({ dragging: true, initialY: clientOffset.y });
    };
    this.onDragEnd = () => {
      if (this.appointmentRef.current) {
        this.setState({ dragging: false });
      }
    };
  }

  render() {
    const {
      classes, className,
      style, children, data,
      onClick: handleClick,
      changeAppointment,
      commitChangedAppointment,
      viewBoundaries,
      ...restProps
    } = this.props;
    const { dragging, initialY } = this.state;

    const onClick = handleClick
      ? {
        onClick: ({ target }) => {
          handleClick({ target, data });
        },
      }
      : null;
    const clickable = onClick || restProps.onDoubleClick;
    const appointmentDuration = moment(data.endDate).diff(moment(data.startDate), 'seconds');

    const draggingPredicate = (appointmentData) => {
      if (appointmentData.title === '* DRAGGING DISABLED *') return false;
      return true;
    };

    const appointmentType = data.allDay || moment(data.endDate).diff(data.startDate, 'hours') > 23
      ? 'horizontal' : 'vertical';

    let offsetY = 0;
    if (this.appointmentRef.current) {
      offsetY = initialY - this.appointmentRef.current.getBoundingClientRect().top;
    }

    return (
      draggingPredicate(data) ? (
        <DragSource
          payload={[{
            type: appointmentType,
            data,
            style,
            appointmentRef: this.appointmentRef,
            changeAppointment,
            commitChangedAppointment,
            appointmentDuration,
            appointmentInitialY: initialY,
            offsetY,
            viewBoundaries,
          }]}
          // elementOffsetY={offsetY}
          onStart={this.onDragStart}
          onEnd={this.onDragEnd}
        >
          <div
            ref={this.appointmentRef}
            className={classNames({
              [classes.appointment]: true,
              [classes.dragging]: dragging,
              [classes.clickableAppointment]: clickable,
            }, className)}
            style={style}
            {...onClick}
            {...restProps}
          >
            {children}
          </div>
        </DragSource>
      ) : (
        <div
          ref={this.appointmentRef}
          className={classNames({
            [classes.appointment]: true,
            [classes.dragging]: dragging,
            [classes.clickableAppointment]: clickable,
          }, className)}
          style={style}
          {...onClick}
          {...restProps}
        >
          {children}
        </div>
      )
    );
  }
}

AppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object.isRequired,
  className: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func,
};

AppointmentBase.defaultProps = {
  onClick: undefined,
  className: undefined,
  data: {},
};

export const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);
