import * as React from 'react';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'Header';

export const classes = {
  head: `${PREFIX}-head`,
  line: `${PREFIX}-line`,
  flexContainer: `${PREFIX}-flexContainer`,
};

const StyledDiv = styled('div')(({
  theme: { spacing, palette },
}) => ({
  [`&.${classes.head}`]: {
    position: 'relative',
    paddingLeft: spacing(1),
    paddingRight: spacing(0.5),
    paddingTop: spacing(0.25),
    minHeight: spacing(1.5),
  },
  [`&.${classes.flexContainer}`]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  [`& .${classes.line}`]: {
    backgroundColor: palette.action.disabledBackground,
    height: spacing(3.5),
    marginLeft: spacing(1),
    marginRight: spacing(1),
    marginTop: spacing(1.25),
    width: '1px',
  },
}));

export const Header = ({
  appointmentData,
  commandButtonComponent: CommandButton,
  showOpenButton,
  showCloseButton,
  showDeleteButton,
  commandButtonIds,
  onOpenButtonClick,
  onDeleteButtonClick,
  onHide,
  className,
  children,
  ...restProps
}) => {
  const handleOpenButtonClick = () => {
    onHide();
    onOpenButtonClick();
  };
  return (
    <StyledDiv
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
        <StyledDiv className={classes.flexContainer}>
          <div className={classes.line} />
          <CommandButton id={commandButtonIds.close} onExecute={onHide} />
        </StyledDiv>
      )}
    </StyledDiv>
  );
};

Header.propTypes = {
  appointmentData: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  commandButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  showOpenButton: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  commandButtonIds: PropTypes.object.isRequired,
  onOpenButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onHide: PropTypes.func,
};

Header.defaultProps = {
  appointmentData: undefined,
  className: undefined,
  children: undefined,
  onOpenButtonClick: () => undefined,
  onHide: () => undefined,
};
