import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export const OpenButton = React.memo(({
  text, onVisibilityToggle, ...restProps
}) => (
  <Button
    onClick={onVisibilityToggle}
    {...restProps}
  >
    {text}
  </Button>
));

OpenButton.propTypes = {
  onVisibilityToggle: PropTypes.func.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

OpenButton.defaultProps = {
  text: '',
  className: undefined,
};
