import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import AccessTime from '@material-ui/icons/AccessTime';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { HOUR_MINUTE_OPTIONS } from '@devexpress/dx-scheduler-core';

const verticalTopHorizontalCenterOptions = { vertical: 'top', horizontal: 'center' };

const styles = theme => ({
  text: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    paddingBottom: theme.spacing(1.75),
    color: theme.palette.primary.contrastText,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  buttonsLeft: {
    position: 'relative',
    bottom: -theme.spacing(2.5),
    textAlign: 'center',
  },
  buttonsRight: {
    textAlign: 'right',
  },
  icon: {
    color: theme.typography.body2.color,
  },
  textCenter: {
    textAlign: 'center',
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
  visible, onHide,
  commandButtonIds,
  onOpenButtonClick,
  onDeleteButtonClick,
  formatDate,
  classes,
  ...restProps
}) => {
  const { target, data = {} } = appointmentMeta;
  const openButtonClickHandler = () => {
    onHide();
    onOpenButtonClick();
  };

  return (
    <Popover
      open={visible}
      anchorEl={target}
      onClose={onHide}
      anchorOrigin={verticalTopHorizontalCenterOptions}
      transformOrigin={verticalTopHorizontalCenterOptions}
      {...restProps}
    >
      <Header appointmentData={data}>
        <div className={classes.buttonsRight}>
          {showDeleteButton
            && <CommandButton id={commandButtonIds.delete} onExecute={onDeleteButtonClick} />}
          {showCloseButton && <CommandButton id={commandButtonIds.close} onExecute={onHide} />}
        </div>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item xs={2} className={classes.flexItem}>
            <div className={classes.buttonsLeft}>
              {showOpenButton
                && <CommandButton id={commandButtonIds.open} onExecute={openButtonClickHandler} />}
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className={classes.title}>
              {data.title}
            </div>
          </Grid>
        </Grid>
      </Header>
      <Content appointmentData={data}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={2} className={classes.textCenter}>
            <AccessTime className={classes.icon} />
          </Grid>
          <Grid item xs={10}>
            <div className={classes.text}>
              {`${formatDate(data.startDate, HOUR_MINUTE_OPTIONS)} - ${formatDate(data.endDate, HOUR_MINUTE_OPTIONS)}`}
            </div>
          </Grid>
        </Grid>
      </Content>
    </Popover>
  );
};

LayoutBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  commandButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  headerComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  contentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  showOpenButton: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  commandButtonIds: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
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
