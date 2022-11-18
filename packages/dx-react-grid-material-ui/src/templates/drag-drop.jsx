import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const PREFIX = 'DragDrop';
export const classes = {
  container: `${PREFIX}-container`,
  column: `${PREFIX}-column`,
};

const StyledDiv = styled('div')(() => ({
  [`&.${classes.container}`]: {
    position: 'fixed',
    zIndex: 1000,
    left: 0,
    top: 0,
    display: 'inline-block',
  },
}));

export const Container = ({
  clientOffset, style, className, children,
  ...restProps
}) => (
  <StyledDiv
    className={classNames(classes.container, className)}
    style={{
      transform: `translate(calc(${clientOffset.x}px - 50%), calc(${clientOffset.y}px - 50%))`,
      msTransform: `translateX(${clientOffset.x}px) translateX(-50%) translateY(${clientOffset.y}px) translateY(-50%)`,
      ...style,
    }}
    {...restProps}
  >
    {children}
  </StyledDiv>
);

Container.propTypes = {
  clientOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

Container.defaultProps = {
  style: null,
  className: undefined,
  children: undefined,
};

const StyledChip = styled(Chip)(({ theme }) => ({
  [`&.${classes.column}`]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    float: 'right',
    cursor: 'move',
  },
}));

export const Column = React.memo(({
  column,
  className,
  ...restProps
}) => (
  <StyledChip
    className={classNames(classes.column, className)}
    label={column.title}
    {...restProps}
  />
));

Column.propTypes = {
  column: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Column.defaultProps = {
  className: undefined,
};
