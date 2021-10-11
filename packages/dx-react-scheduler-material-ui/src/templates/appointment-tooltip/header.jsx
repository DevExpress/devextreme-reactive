import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';

const styles = ({ spacing, palette }) => ({
  head: {
    position: 'relative',
    paddingLeft: spacing(1),
    paddingRight: spacing(0.5),
    paddingTop: spacing(0.25),
    minHeight: spacing(1.5),
  },
  line: {
    backgroundColor: palette.action.disabledBackground,
    height: spacing(3.5),
    marginLeft: spacing(1),
    marginRight: spacing(1),
    marginTop: spacing(1.25),
    width: '1px',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

const HeaderBase = ({
  appointmentData,
  commandButtonComponent: CommandButton,
  showOpenButton,
  showCloseButton,
  showDeleteButton,
  commandButtonIds,
  onOpenButtonClick,
  onDeleteButtonClick,
  onHide,
  classes,
  className,
  children,
  ...restProps
}) => {
  const handleOpenButtonClick = () => {
    onHide();
    onOpenButtonClick();
  };
  return (
    <div
      className={classNames(classes.head, classes.flexContainer, className)}
      {...restProps}
    >
      {showOpenButton && (
        <CommandButton id={commandButtonIds.open} onExecute={handleOpenButtonClick} />
      )}
      {showDeleteButton
        && <CommandButton id={commandButtonIds.delete} onExecute={onDeleteButtonClick} />}
      {children}
      {showCloseButton && (
        <div className={classes.flexContainer}>
          <div className={classes.line} />
          <CommandButton id={commandButtonIds.close} onExecute={onHide} />
        </div>
      )}
    </div>
  );
};

HeaderBase.propTypes = {
  classes: PropTypes.object.isRequired,
  appointmentData: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  commandButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  showOpenButton: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  commandButtonIds: PropTypes.object.isRequired,
  onOpenButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onHide: PropTypes.func,
};

HeaderBase.defaultProps = {
  appointmentData: undefined,
  className: undefined,
  children: undefined,
  onOpenButtonClick: () => undefined,
  onDeleteButtonClick: () => undefined,
  onHide: () => undefined,
};

export const Header = withStyles(styles, { name: 'Header' })(HeaderBase);
