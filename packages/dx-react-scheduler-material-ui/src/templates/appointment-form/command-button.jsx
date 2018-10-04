import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export const CommandButton = ({
  text,
  readOnly,
  onExecute,
  id,
  ...restProps
}) => (
  <Button
    color="primary"
    disabled={readOnly}
    onClick={onExecute}
    {...restProps}
  >
    {text}
  </Button>
);

CommandButton.propTypes = {
  text: PropTypes.string.isRequired,
  onExecute: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

CommandButton.defaultProps = {
  readOnly: false,
};
