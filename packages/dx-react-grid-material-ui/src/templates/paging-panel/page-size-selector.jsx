import * as React from 'react';
import PropTypes from 'prop-types';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { IS_LEGACY_EDGE_MEDIA_QUERY } from '../constants';

const PREFIX = 'PageSizeSelector';
export const classes = {
  pageSizeSelector: `${PREFIX}-pageSizeSelector`,
  label: `${PREFIX}-label`,
  selectIcon: `${PREFIX}-selectIcon`,
  selectMenu: `${PREFIX}-selectMenu`,
  inputRoot: `${PREFIX}-inputRoot`,
};
const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.pageSizeSelector}`]: {
    ...theme.typography.caption,
    paddingRight: theme.spacing(5),
    // NOTE: fixes vertical alignment in FF
    display: 'flex',
    alignItems: 'center',
  },
  [`& .${classes.label}`]: {
    paddingRight: theme.spacing(3),
  },
  [`& .${classes.selectIcon}`]: {
    top: 2,
  },
  [`& .${classes.selectMenu}`]: {
    // NOTE: fix position for non-chromium Edge (issues 2234, 2788)
    [`${IS_LEGACY_EDGE_MEDIA_QUERY}`]: {
      position: 'absolute !important',
    },
  },
  [`& .${classes.inputRoot}`]: {
    fontSize: theme.spacing(1.75),
    textAlign: 'right',
  },
  '@media (max-width: 768px)': {
    [`&.${classes.pageSizeSelector}`]: {
      paddingRight: theme.spacing(2),
    },
    [`& .${classes.label}`]: {
      display: 'none',
    },
  },
}));

export const PageSizeSelector = ({
  pageSize,
  onPageSizeChange,
  pageSizes,
  getMessage,
}) => {
  const showAll = getMessage('showAll');
  return (
    <StyledDiv className={classes.pageSizeSelector}>
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
    </StyledDiv>
  );
};

PageSizeSelector.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  getMessage: PropTypes.func.isRequired,
};
