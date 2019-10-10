import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'clsx';
import { setColor } from '../../utils';

const styles = ({ spacing, palette }) => ({
  button: {
    padding: spacing(0.5, 3.5),
    marginLeft: spacing(3),
    height: spacing(4.5),
    '&:first-child': {
      marginLeft: 0,
    },
    backgroundColor: setColor(300, palette.primary),
    color: palette.primary.contrastText,
    '&:hover': {
      backgroundColor: setColor(400, palette.primary),
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
