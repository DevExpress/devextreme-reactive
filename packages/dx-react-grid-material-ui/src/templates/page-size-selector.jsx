import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { DropDownMenu } from './drop-down-menu';

const styleSheet = createStyleSheet('PageSizeSelector', theme => ({
  pageSizeSelector: {
    ...theme.typography.caption,
    display: 'inline-block',
  },
  label: {
    paddingRight: theme.spacing.unit * 3,
  },
  pageSizes: {
    display: 'inline-block',
    minWidth: theme.spacing.unit * 4,
  },
  '@media (max-width: 767px)': {
    label: {
      display: 'none',
    },
  },
}));

const PageSizeSelectorBase = ({ pageSize, onPageSizeChange, allowedPageSizes, classes }) => (
  <div className={classes.pageSizeSelector}>
    <span className={classes.label}>
    Rows per page:
    </span>
    <DropDownMenu
      defaultTitle={String(pageSize)}
      items={allowedPageSizes}
      onItemClick={(item) => {
        onPageSizeChange(item);
      }}
      className={classes.pageSizes}
    />
  </div>
);

PageSizeSelectorBase.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  classes: PropTypes.object.isRequired,
};

export const PageSizeSelector = withStyles(styleSheet)(PageSizeSelectorBase);
