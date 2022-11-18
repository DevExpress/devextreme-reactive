import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { LAYOUT_MEDIA_QUERY } from '../constants';

const PREFIX = 'Layout';

export const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`,
  stickyContainer: `${PREFIX}-stickyContainer`,
};

const StyledDiv = styled('div')({
  [`&.${classes.root}`]: {
    height: '100%',
    margin: '0 auto',
    overflowY: 'auto',
  },
  [`& .${classes.container}`]: {
    display: 'flex',
    [`${LAYOUT_MEDIA_QUERY}`]: {
      flexDirection: 'column',
    },
  },
  [`& .${classes.stickyContainer}`]: {
    display: 'flex',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
});

export const Layout = ({
  basicLayoutComponent: BasicLayout,
  commandLayoutComponent: CommandLayout,
  recurrenceLayoutComponent: RecurrenceLayout,
  isRecurrence,
  children,
  className,
  ...restProps
}) => (
  <StyledDiv
    className={classNames(classes.root, className)}
    {...restProps}
  >
    <div className={classes.stickyContainer}>
      <CommandLayout />
    </div>
    <div className={classes.container}>
      <BasicLayout />
      <RecurrenceLayout />
    </div>
    {children}
  </StyledDiv>
);

Layout.propTypes = {
  basicLayoutComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  commandLayoutComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceLayoutComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  isRecurrence: PropTypes.bool,
};

Layout.defaultProps = {
  className: undefined,
  isRecurrence: false,
  children: null,
};
