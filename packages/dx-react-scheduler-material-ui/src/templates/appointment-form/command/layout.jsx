import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import {
  SAVE_BUTTON,
  DELETE_BUTTON,
  CANCEL_BUTTON,
} from '@devexpress/dx-scheduler-core';

const styles = ({ spacing, palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(4),
    position: 'sticky',
    top: 0,
    backgroundColor: palette.background.paper,
    zIndex: 1,
  },
  basic: {
    maxWidth: '650px',
  },
  fullSize: {
    maxWidth: '1150px',
  },
  '@media (max-width: 700px)': {
    basic: {
      maxWidth: '700px',
    },
    root: {
      paddingRight: spacing(2),
      paddingLeft: 0,
      paddingTop: spacing(1),
    },
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
        <CommandButton
          onExecute={onDeleteButtonClick}
          getMessage={getMessage}
          id={DELETE_BUTTON}
        />
        <CommandButton
          getMessage={getMessage}
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
};

LayoutBase.defaultProps = {
  className: undefined,
  children: undefined,
  fullSize: false,
  readOnly: false,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
