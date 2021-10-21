import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import withStyles from '@mui/styles/withStyles';
import { SMALL_LAYOUT_MEDIA_QUERY } from '../constants';

const verticalTopHorizontalCenterOptions = { vertical: 'top', horizontal: 'center' };

const styles = {
  popover: {
    borderRadius: '8px',
    width: '400px',
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      width: '300px',
    },
  },
};

const LayoutBase = ({
  headerComponent: Header,
  contentComponent: Content,
  commandButtonComponent,
  recurringIconComponent,
  appointmentMeta,
  appointmentResources,
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
        appointmentResources={appointmentResources}
        formatDate={formatDate}
        recurringIconComponent={recurringIconComponent}
      />
    </Popover>
  );
};

LayoutBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  commandButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  headerComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  contentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurringIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
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
  appointmentResources: PropTypes.array,
  visible: PropTypes.bool,
  onHide: PropTypes.func,
};
LayoutBase.defaultProps = {
  onOpenButtonClick: () => undefined,
  onDeleteButtonClick: () => undefined,
  onHide: () => undefined,
  appointmentMeta: {},
  appointmentResources: [],
  visible: false,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
