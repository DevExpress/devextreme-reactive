import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';

const verticalTopHorizontalCenterOptions = { vertical: 'top', horizontal: 'center' };

const styles = {
  popover: {
    borderRadius: '8px',
  },
};

const LayoutBase = ({
  headerComponent: Header,
  contentComponent: Content,
  commandButtonComponent,
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

  const timeText = moment(data.startDate).isSame(data.endDate)
    ? formatDate(data.startDate, HOUR_MINUTE_OPTIONS)
    : `${formatDate(data.startDate, HOUR_MINUTE_OPTIONS)} - ${formatDate(data.endDate, HOUR_MINUTE_OPTIONS)}`;

  return (
    <Popover
      open={visible}
      anchorEl={target}
      onClose={onHide}
      anchorOrigin={verticalTopHorizontalCenterOptions}
      transformOrigin={verticalTopHorizontalCenterOptions}
      PaperProps={{
        className: classes.popover,
      }}
      {...restProps}
    >
      <Header
        appointmentData={data}
        commandButtonComponent={commandButtonComponent}
        showOpenButton={showOpenButton}
        showCloseButton={showCloseButton}
        showDeleteButton={showDeleteButton}
        commandButtonIds={commandButtonIds}
        onOpenButtonClick={onOpenButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onHide={onHide}
      />
      <Content
        appointmentData={data}
        formatDate={formatDate}
      />
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
