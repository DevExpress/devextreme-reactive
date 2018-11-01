import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  text: {
    ...theme.typography.body1,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.title,
    padding: theme.spacing.unit * 1.75,
    color: theme.palette.background.default,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  buttonsLeft: {
    display: 'inline-block',
  },
  buttonsRight: {
    float: 'right',
    display: 'inline-block',
  },
});

const LayoutBase = ({
  headerComponent: Header,
  contentComponent: Content,
  commandButtonComponent: CommandButton,
  appointmentMeta,
  showOpenButton,
  showCloseButton,
  showDeleteButton,
  mapAppointmentData,
  visible, onHide,
  commandButtonIds,
  onOpenButtonClick,
  onDeleteButtonClick,
  classes,
  ...restProps
}) => {
  const { target, data = {} } = appointmentMeta;
  const openButtonClickHandler = () => {
    onHide();
    onOpenButtonClick();
  };
  const { title, startDate, endDate } = mapAppointmentData(data);

  return (
    <Popover
      open={visible}
      anchorEl={target}
      onClose={onHide}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      {...restProps}
    >
      <Header appointmentData={data}>
        <div>
          <div className={classes.buttonsLeft}>
            {showOpenButton
              && <CommandButton id={commandButtonIds.open} onExecute={openButtonClickHandler} />}
          </div>
          <div className={classes.buttonsRight}>
            {showDeleteButton
              && <CommandButton id={commandButtonIds.delete} onExecute={onDeleteButtonClick} />}
            {showCloseButton && <CommandButton id={commandButtonIds.close} onExecute={onHide} />}
          </div>
        </div>
        <div className={classes.title}>
          {title}
        </div>
      </Header>
      <Content appointmentData={data}>
        <div className={classes.text}>
          {moment(startDate).format('h:mm A')}
        </div>
        {' - '}
        <div className={classes.text}>
          {moment(endDate).format('h:mm A')}
        </div>
      </Content>
    </Popover>
  );
};

LayoutBase.propTypes = {
  commandButtonComponent: PropTypes.func.isRequired,
  headerComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
  showOpenButton: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  commandButtonIds: PropTypes.object.isRequired,
  mapAppointmentData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onOpenButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  appointmentMeta: PropTypes.shape({
    target: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    data: PropTypes.object,
  }),
  visible: PropTypes.bool,
  onHide: PropTypes.func,
};
LayoutBase.defaultProps = {
  onOpenButtonClick: () => undefined,
  onDeleteButtonClick: () => undefined,
  onHide: () => undefined,
  appointmentMeta: {},
  visible: false,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
