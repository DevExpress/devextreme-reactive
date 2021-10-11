import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';
import classNames from 'clsx';
import { ensureColor } from '../../utils';

const styles = ({ spacing, palette }) => ({
  button: {
    padding: spacing(0.5, 3.5),
    marginLeft: spacing(3),
    height: spacing(4.5),
    '&:first-child': {
      marginLeft: 0,
    },
    backgroundColor: ensureColor(300, palette.primary),
    color: palette.primary.contrastText,
    '&:hover': {
      backgroundColor: ensureColor(400, palette.primary),
    },
  },
});

const SaveButtonBase = React.memo(({
  classes, getMessage, className, onExecute, ...restProps
}) => (
  <Button
    className={classNames(classes.button, className)}
    onClick={onExecute}
    {...restProps}
  >
    {getMessage('commitCommand')}
  </Button>
));

SaveButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  onExecute: PropTypes.func.isRequired,
};

SaveButtonBase.defaultProps = {
  className: undefined,
};

export const SaveButton = withStyles(styles)(SaveButtonBase, { name: 'SaveButton' });
