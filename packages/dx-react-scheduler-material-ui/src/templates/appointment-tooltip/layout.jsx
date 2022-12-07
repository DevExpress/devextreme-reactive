import * as React from 'react';
import { styled, Popover } from '@mui/material';
import PropTypes from 'prop-types';
import { SMALL_LAYOUT_MEDIA_QUERY } from '../constants';

const PREFIX = 'Layout';

export const classes = {
  popover: `${PREFIX}-popover`,
};

const StyledPopover = styled(Popover)({
  [`& .${classes.popover}`]: {
    borderRadius: '8px',
    width: '400px',
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      width: '300px',
    },
  },
});

const verticalTopHorizontalCenterOptions = { vertical: 'top', horizontal: 'center' };

export const Layout = ({
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
  ...restProps
}) => {
  const { target, data = {} } = appointmentMeta;

  return (
    <StyledPopover
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
    </StyledPopover>
  );
};

Layout.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  commandButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  headerComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  contentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurringIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  showOpenButton: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  commandButtonIds: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  onOpenButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func.isRequired,
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
Layout.defaultProps = {
  onOpenButtonClick: () => undefined,
  onHide: () => undefined,
  appointmentMeta: {},
  appointmentResources: [],
  visible: false,
};
