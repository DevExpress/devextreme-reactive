import React from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { DropDownMenu } from './drop-down-menu';

const styleSheet = createStyleSheet('PageSizeSelector', theme => ({
  button: {
    minWidth: theme.spacing.unit * 2,
  },
  pageSizeSelector: {
    minWidth: theme.spacing.unit * 4,
    display: 'inline-block',
  },
  '@media (max-width: 767px)': {

  },
}));

export const PageSizeSelectorBase = ({ pageSize, onPageSizeChange, allowedPageSizes, classes }) => (
  <div style={{ display: 'inline-block' }}>
    <div className={classes.pageSizeSelector}>
      <DropDownMenu
        defaultTitle={String(pageSize)}
        items={allowedPageSizes}
        onItemClick={(item) => {
          onPageSizeChange(item);
        }}
      />
    </div>
  </div>
);

PageSizeSelectorBase.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  classes: PropTypes.object.isRequired,
};

export const PageSizeSelector = withStyles(styleSheet)(PageSizeSelectorBase);
