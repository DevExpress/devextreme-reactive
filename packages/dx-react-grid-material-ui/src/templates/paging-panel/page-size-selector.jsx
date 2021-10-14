import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import withStyles from '@mui/styles/withStyles';
import { IS_LEGACY_EDGE_MEDIA_QUERY } from '../constants';

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
    // NOTE: fix position for non-chromium Edge (issues 2234, 2788)
    [`${IS_LEGACY_EDGE_MEDIA_QUERY}`]: {
      position: 'absolute !important',
    },
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
            // disableUnderline
            inputProps={{ disableUnderline: true }}
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
