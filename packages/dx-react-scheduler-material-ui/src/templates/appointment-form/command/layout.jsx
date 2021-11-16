import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import classNames from 'clsx';
import {
  SAVE_BUTTON,
  DELETE_BUTTON,
  CANCEL_BUTTON,
} from '@devexpress/dx-scheduler-core';
import { TRANSITIONS_TIME, LAYOUT_MEDIA_QUERY } from '../../constants';

const PREFIX = 'Layout';

export const classes = {
  root: `${PREFIX}-root`,
  basic: `${PREFIX}-basic`,
  fullSize: `${PREFIX}-fullSize`,
  line: `${PREFIX}-line`,
};

const StyledGrid = styled(Grid)(({ theme: { spacing, palette } }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(4),
    transition: `all ${TRANSITIONS_TIME}ms cubic-bezier(0, 0, 0.2, 1)`,
    backgroundColor: palette.background.paper,
  },
  [`&.${classes.basic}`]: {
    width: '650px',
  },
  [`&.${classes.fullSize}`]: {
    width: '1150px',
    '@media (min-width: 700px) and (max-width: 850px)': {
      width: '700px',
    },
    '@media (min-width: 850px) and (max-width: 1000px)': {
      width: '850px',
    },
    '@media (min-width: 1000px) and (max-width: 1150px)': {
      width: '1000px',
    },
  },
  [`${LAYOUT_MEDIA_QUERY}`]: {
    [`&.${classes.basic}`]: {
      maxWidth: '700px',
      width: '100%',
    },
    [`&.${classes.root}`]: {
      paddingRight: spacing(2),
      paddingLeft: 0,
      paddingTop: spacing(1),
      maxWidth: '700px',
      width: '100%',
    },
  },
}));

const StyledDiv = styled('div')(({ theme: { palette, spacing } }) => ({
  [`${LAYOUT_MEDIA_QUERY}`]: {
    [`&.${classes.line}`]: {
      backgroundColor: palette.action.disabledBackground,
      height: spacing(4.5),
      width: '1px',
    },
  },
}));

export const Layout = ({
  commandButtonComponent: CommandButton,
  onCommitButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  getMessage,
  children,
  className,
  fullSize,
  readOnly,
  disableSaveButton,
  hideDeleteButton,
  ...restProps
}) => (
  <StyledGrid
    className={classNames({
      [classes.root]: true,
      [classes.basic]: !fullSize,
      [classes.fullSize]: fullSize,
    }, className)}
    container
    alignItems="center"
    {...restProps}
  >
    <CommandButton
      onExecute={onCancelButtonClick}
      getMessage={getMessage}
      id={CANCEL_BUTTON}
    />
    {!readOnly && (
      <React.Fragment>
        {!hideDeleteButton && (
          <React.Fragment>
            <CommandButton
              onExecute={onDeleteButtonClick}
              getMessage={getMessage}
              id={DELETE_BUTTON}
            />
            <StyledDiv className={classes.line} />
          </React.Fragment>
        )}
        <CommandButton
          getMessage={getMessage}
          disabled={disableSaveButton}
          onExecute={onCommitButtonClick}
          id={SAVE_BUTTON}
        />
      </React.Fragment>
    )}
    {children}
  </StyledGrid>
);

Layout.propTypes = {
  commandButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onCommitButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  fullSize: PropTypes.bool,
  readOnly: PropTypes.bool,
  children: PropTypes.node,
  disableSaveButton: PropTypes.bool,
  hideDeleteButton: PropTypes.bool,
};

Layout.defaultProps = {
  className: undefined,
  children: undefined,
  fullSize: false,
  readOnly: false,
  disableSaveButton: false,
  hideDeleteButton: false,
};
