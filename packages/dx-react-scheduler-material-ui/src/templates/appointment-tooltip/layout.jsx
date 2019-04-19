import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import AccessTime from '@material-ui/icons/AccessTime';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  text: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    paddingBottom: theme.spacing.unit * 1.75,
    color: theme.palette.primary.contrastText,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  buttonsLeft: {
    position: 'relative',
    bottom: -(theme.spacing.unit * 5) / 2,
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
  dateFormat,
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
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      {...restProps}
    >
      <Header appointmentData={data}>
        <div className={classes.buttonsRight}>
          {showDeleteButton
            && <CommandButton id={commandButtonIds.delete} onExecute={onDeleteButtonClick} />}
          {showCloseButton && <CommandButton id={commandButtonIds.close} onExecute={onHide} />}
        </div>
        <Grid container spacing={8} alignItems="center">
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
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={2} className={classes.textCenter}>
            <AccessTime className={classes.icon} />
          </Grid>
          <Grid item xs={10}>
            <div className={classes.text}>
              {`${dateFormat(data.startDate, { hour: 'numeric', minute: 'numeric' })} - ${dateFormat(data.endDate, { hour: 'numeric', minute: 'numeric' })}`}
            </div>
          </Grid>
        </Grid>
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
