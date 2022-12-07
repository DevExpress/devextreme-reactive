import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import {
  TableHead, TableBody, TableFooter, styled,
} from '@mui/material';
import { getStickyStyles } from './utils';

const PREFIX = 'TableParts';
export const classes = {
  fixedHeader: `${PREFIX}-fixedHeader`,
  fixedFooter: `${PREFIX}-fixedFooter`,
};

const StyledHead = styled(TableHead)(({ theme }) => ({
  [`&.${classes.fixedHeader}`]: {
    ...getStickyStyles(theme, 500),
    top: 0,
  },
}));

const StyledFooter = styled(TableFooter)(({ theme }) => ({
  [`&.${classes.fixedFooter}`]: {
    ...getStickyStyles(theme),
    bottom: 0,
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
