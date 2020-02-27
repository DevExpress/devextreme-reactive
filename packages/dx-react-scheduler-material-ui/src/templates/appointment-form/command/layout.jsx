import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'clsx';
import {
  SAVE_BUTTON,
  DELETE_BUTTON,
  CANCEL_BUTTON,
} from '@devexpress/dx-scheduler-core';
import { TRANSITIONS_TIME, LAYOUT_MEDIA_QUERY } from '../../constants';

const styles = ({ spacing, palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(4),
    transition: `all ${TRANSITIONS_TIME}ms cubic-bezier(0, 0, 0.2, 1)`,
    backgroundColor: palette.background.paper,
  },
  basic: {
    width: '650px',
  },
  fullSize: {
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
    basic: {
      maxWidth: '700px',
      width: '100%',
    },
    root: {
      paddingRight: spacing(2),
      paddingLeft: 0,
      paddingTop: spacing(1),
      maxWidth: '700px',
      width: '100%',
    },
  },
  line: {
    backgroundColor: palette.action.disabledBackground,
    height: spacing(4.5),
    width: '1px',
  },
});

const LayoutBase = ({
  commandButtonComponent: CommandButton,
  onCommitButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  getMessage,
  children,
  classes,
  className,
  fullSize,
  readOnly,
  disableSaveButton,
  hideDeleteButton,
  ...restProps
}) => (
  <Grid
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
            <div className={classes.line} />
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
  </Grid>
);

LayoutBase.propTypes = {
  commandButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  classes: PropTypes.object.isRequired,
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

LayoutBase.defaultProps = {
  className: undefined,
  children: undefined,
  fullSize: false,
  readOnly: false,
  disableSaveButton: false,
  hideDeleteButton: false,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
