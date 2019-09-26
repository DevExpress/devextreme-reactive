import * as React from 'react';
import * as PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const Layout = React.memo(({
  buttonComponent: Button,
  handleClose,
  commit,
  availableOperations,
  getMessage,
  isDeleting,
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
      <DialogTitle>{getMessage(isDeleting ? 'menuDeleteTitle' : 'menuEditTitle')}</DialogTitle>
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

Layout.propTypes = {
  buttonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  availableOperations: PropTypes.array.isRequired,
  handleClose: PropTypes.func,
  commit: PropTypes.func,
  getMessage: PropTypes.func,
  isDeleting: PropTypes.bool,
};

Layout.defaultProps = {
  handleClose: () => undefined,
  commit: () => undefined,
  getMessage: () => undefined,
  isDeleting: false,
};
