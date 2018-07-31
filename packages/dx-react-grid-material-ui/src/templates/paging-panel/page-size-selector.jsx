import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  pageSizeSelector: {
    ...theme.typography.caption,
    float: 'right',
    paddingRight: theme.spacing.unit * 5,
  },
  label: {
    paddingRight: theme.spacing.unit * 3,
    lineHeight: `${theme.spacing.unit * 5}px`,
    float: 'left',
  },
  pageSizes: {
    display: 'inline-block',
  },
  pageSizeTitle: {
    width: 'auto',
    marginRight: theme.spacing.unit / 2,
  },
  inputRoot: {
    paddingTop: theme.spacing.unit * 0.75,
    float: 'right',
    fontSize: theme.spacing.unit * 1.75,
    textAlign: 'right',
  },
  selectIcon: {
    top: 2,
  },
  '@media (max-width: 768px)': {
    label: {
      display: 'none',
    },
    pageSizeSelector: {
      paddingRight: theme.spacing.unit * 2,
    },
  },
});

const PageSizeSelectorBase = ({
  pageSize,
  onPageSizeChange,
  pageSizes,
  getMessage,
  classes,
}) => {
  const showAll = getMessage('showAll');
  return (
    <div className={classes.pageSizeSelector}>
      <span className={classes.label}>
        {getMessage('rowsPerPage')}
      </span>
      <Select
        value={pageSize}
        onChange={event => onPageSizeChange(event.target.value)}
        classes={{
          icon: classes.selectIcon,
        }}
        input={(
          <Input
            disableUnderline
            classes={{ root: classes.inputRoot }}
          />
)}
      >
        {pageSizes.map(item => (
          <MenuItem key={item} value={item}>
            {item !== 0 ? item : showAll }
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

PageSizeSelectorBase.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
};

export const PageSizeSelector = withStyles(styles, { name: 'PageSizeSelector' })(PageSizeSelectorBase);
