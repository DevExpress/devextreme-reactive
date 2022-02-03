import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import { styled } from '@mui/material/styles';

const PREFIX = 'TableParts';
export const classes = {
  fixedHeader: `${PREFIX}-fixedHeader`,
  fixedFooter: `${PREFIX}-fixedFooter`,
};

const StyledHead = styled(TableHead)(({ theme }) => ({
  [`&.${classes.fixedHead}`]: {
    position: 'sticky',
    top: 0,
    background: theme.palette.background.paper,
    zIndex: 500,
  },
}));

const StyledFooter = styled(TableFooter)(({ theme }) => ({
  [`&.${classes.fixedFooter}`]: {
    position: 'sticky',
    bottom: 0,
    background: theme.palette.background.paper,
    zIndex: 500,
  },
}));

export const Head = ({
  isFixed, className, ...restProps
}) => (
  <StyledHead
    className={classNames({ [classes.fixedHeader]: isFixed }, className)}
    {...restProps}
  />
);

Head.propTypes = {
  className: PropTypes.string,
  isFixed: PropTypes.bool,
};

Head.defaultProps = {
  isFixed: undefined,
  className: undefined,
};

export const Body = ({ isFixed, ...props }) => <TableBody {...props} />;
Body.propTypes = {
  isFixed: PropTypes.bool,
};

Body.defaultProps = {
  isFixed: undefined,
};

export const Footer = ({ isFixed, ...props }) => (
  <StyledFooter className={classNames({ [classes.fixedFooter]: isFixed })} {...props} />
);

Footer.propTypes = {
  isFixed: PropTypes.bool,
};

Footer.defaultProps = {
  isFixed: undefined,
};
