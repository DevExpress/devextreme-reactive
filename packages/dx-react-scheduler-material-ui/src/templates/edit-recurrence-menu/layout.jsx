import * as React from 'react';
import * as PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import withStyles from '@mui/styles/withStyles';
import { SMALL_LAYOUT_MEDIA_QUERY } from '../constants';

const styles = ({ typography }) => ({
  title: typography.h6,
  content: {
    fontSize: '1rem',
  },
  [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
    title: {
      fontSize: '1.1rem',
    },
    content: {
      fontSize: '0.9rem',
    },
  },
});

const LayoutBase = React.memo(({
  buttonComponent: Button,
  handleClose,
  commit,
  availableOperations,
  getMessage,
  isDeleting,
  classes,
  ...restProps
}) => {
  const [currentValue, setCurrentValue] = React.useState(availableOperations[0].value);
  const handleChange = React.useCallback(
    (event) => {
      setCurrentValue(event.target.value);
    },
  );

  const onCommitButtonClick = () => {
    commit(currentValue);
  };

  return (
    <div
      {...restProps}
    >
      <DialogTitle className={classes.title}>
        {getMessage(isDeleting ? 'menuDeletingTitle' : 'menuEditingTitle')}
      </DialogTitle>
      <DialogContent>
        <RadioGroup
          value={currentValue}
          onChange={handleChange}
        >
          {availableOperations.map(operation => (
            <FormControlLabel
              value={operation.value}
              control={<Radio />}
              label={operation.title}
              key={operation.value}
              classes={{ label: classes.content }}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} title={getMessage('cancelButton')} />
        <Button onClick={onCommitButtonClick} title={getMessage('commitButton')} color="primary" />
      </DialogActions>
    </div>
  );
});

LayoutBase.propTypes = {
  buttonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  availableOperations: PropTypes.array.isRequired,
  handleClose: PropTypes.func,
  commit: PropTypes.func,
  getMessage: PropTypes.func,
  isDeleting: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

LayoutBase.defaultProps = {
  handleClose: () => undefined,
  commit: () => undefined,
  getMessage: () => undefined,
  isDeleting: false,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
