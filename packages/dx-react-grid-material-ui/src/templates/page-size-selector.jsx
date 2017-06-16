import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { pageSizeTitle } from '@devexpress/dx-grid-core';
import { DropDownMenu } from './drop-down-menu';

const styleSheet = createStyleSheet('PageSizeSelector', theme => ({
  pageSizeSelector: {
    ...theme.typography.caption,
    float: 'right',
    paddingRight: theme.spacing.unit * 5,
  },
  label: {
    paddingRight: theme.spacing.unit,
    lineHeight: `${theme.spacing.unit * 5}px`,
  },
  pageSizes: {
    display: 'inline-block',
    minWidth: theme.spacing.unit * 5,
  },
  '@media (max-width: 768px)': {
    label: {
      display: 'none',
    },
    pageSizeSelector: {
      paddingRight: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit,
    },
  },
}));

const PageSizeSelectorBase = ({ pageSize, onPageSizeChange, allowedPageSizes, classes }) => (
  <div className={classes.pageSizeSelector}>
    <span className={classes.label}>
    Rows per page:
    </span>
    <DropDownMenu
      selectedItem={pageSize}
      items={allowedPageSizes}
      itemTemplate={pageSizeTitle}
      onItemClick={(item) => {
        onPageSizeChange(item);
      }}
      className={classes.pageSizes}
    />
  </div>
);

PageSizeSelectorBase.propTypes = {
  pageSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string]))
  .isRequired,
  classes: PropTypes.object.isRequired,
};

export const PageSizeSelector = withStyles(styleSheet)(PageSizeSelectorBase);
