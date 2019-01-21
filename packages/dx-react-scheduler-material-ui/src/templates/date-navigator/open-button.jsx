import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const OpenButton = ({
  text, onVisibilityToggle, ...restProps
}) => (
  <Button
    onClick={onVisibilityToggle}
    {...restProps}
  >
    {text}
  </Button>
);

OpenButton.propTypes = {
  onVisibilityToggle: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

OpenButton.defaultProps = {
  text: '',
  className: undefined,
};
