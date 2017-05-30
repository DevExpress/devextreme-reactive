import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('PageSizeSelector', theme => ({
  button: {
    minWidth: theme.spacing.unit * 2,
  },
}));

export const PageSizeSelectorBase = ({ pageSize, onPageSizeChange, allowedPageSizes, classes }) => (
  <div style={{ display: 'inline-block' }}>
    {allowedPageSizes.map(item => (
      <Button
        key={item}
        accent={item === pageSize}
        raised={item === pageSize}
        className={classes.button}
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

PageSizeSelectorBase.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  classes: PropTypes.object.isRequired,
};

export const PageSizeSelector = withStyles(styleSheet)(PageSizeSelectorBase);
