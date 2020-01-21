import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export const ExportButton = ({ onClick, getMessage, ...restProps }) => (
  <Button onClick={onClick} {...restProps}>
    {getMessage('export')}
  </Button>
);

ExportButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
};
