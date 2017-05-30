import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

export const PageSizeSelector = ({ pageSize, onPageSizeChange, allowedPageSizes }) => (
  <div style={{ display: 'inline-block' }}>
    {allowedPageSizes.map(item => (
      <Button
        key={item}
        style={{ minWidth: '16px' }}
        accent={item === pageSize}
        raised={item === pageSize}
        onTouchTap={(e) => {
          e.preventDefault();
          onPageSizeChange(item);
        }}
      >
        {item}
      </Button>
    ))}
  </div>
);

PageSizeSelector.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};
