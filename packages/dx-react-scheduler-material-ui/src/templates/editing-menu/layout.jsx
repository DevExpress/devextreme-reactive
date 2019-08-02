import * as React from 'react';
import * as PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import classNames from 'classnames';

export const Layout = React.memo(({
  buttonComponent: Button,
  handleClose,
  commit,
  availableOperations,
  ...restProps
}) => {
  const [currentValue, setCurrentValue] = React.useState(availableOperations[0].value);
  const onCommitButtonClick = () => {
    handleClose();
    commit(currentValue);
  };

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
  };

  return (
    <div
      {...restProps}
    >
      <DialogTitle>Edit recurring event</DialogTitle>
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
        <Button onClick={handleClose} title="Cancel" />
        <Button onClick={onCommitButtonClick} title="OK" color="primary" />
      </DialogActions>
    </div>
  );
});

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
