import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { DropDownMenu } from './drop-down-menu';

const styles = theme => ({
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
  },
  pageSizeTitle: {
    width: 'auto',
    marginRight: theme.spacing.unit / 2,
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
});

const PageSizeSelectorBase = ({
  pageSize,
  onPageSizeChange,
  allowedPageSizes,
  showAllText,
  classes,
}) => (
  <div className={classes.pageSizeSelector}>
    <span className={classes.label}>
    Rows per page:
    </span>
    <DropDownMenu
      selectedItem={pageSize}
      items={allowedPageSizes}
      itemTemplate={title => title || showAllText}
      onItemClick={(item) => {
        onPageSizeChange(item);
      }}
      className={classes.pageSizes}
      titleClassName={classes.pageSizeTitle}
    />
  </div>
);

PageSizeSelectorBase.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  showAllText: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

PageSizeSelectorBase.defaultProps = {
  showAllText: 'All',
};

export const PageSizeSelector = withStyles(styles, { name: 'PageSizeSelector' })(PageSizeSelectorBase);
