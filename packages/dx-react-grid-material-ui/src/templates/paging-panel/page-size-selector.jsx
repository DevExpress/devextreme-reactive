import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  pageSizeSelector: {
    ...theme.typography.caption,
    paddingRight: theme.spacing(5),
    // NOTE: fixes vertical alignment in FF
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    paddingRight: theme.spacing(3),
  },
  pageSizeTitle: {
    width: 'auto',
    marginRight: theme.spacing(2),
  },
  inputRoot: {
    fontSize: theme.spacing(1.75),
    textAlign: 'right',
  },
  selectIcon: {
    top: 2,
  },
  selectMenu: {
    position: 'absolute !important',
  },
  '@media (max-width: 768px)': {
    label: {
      display: 'none',
    },
    pageSizeSelector: {
      paddingRight: theme.spacing(2),
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
        MenuProps={{
          className: classes.selectMenu,
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
