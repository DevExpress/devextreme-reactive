import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Typography from '@mui/material/Typography';
import { VIEW_TYPES } from '@devexpress/dx-scheduler-core';
import { SPACING_CELL_HEIGHT } from '../constants';

const PREFIX = 'TitleCell';

export const classes = {
  container: `${PREFIX}-container`,
  content: `${PREFIX}-content`,
  title: `${PREFIX}-title`,
  fixedHeight: `${PREFIX}-fixedHeight`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    userSelect: 'none',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
  },

  [`& .${classes.content}`]: {
    width: theme.spacing(10),
    boxSizing: 'border-box',
    height: theme.spacing(5.75),
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  [`& .${classes.title}`]: {
    paddingRight: theme.spacing(2),
    ...theme.typography.caption,
    color: theme.palette.text.secondary,
  },

  [`&.${classes.fixedHeight}`]: {
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL]),
    width: '100%',
  },
}));

export const TitleCellBase = React.memo(({
  getMessage, className, fixedHeight, ...restProps
}) => (
  <StyledDiv
    className={classNames({
      [classes.container]: true,
      [classes.fixedHeight]: fixedHeight,
    }, className)}
    {...restProps}
  >
    <div
      className={classNames({
        [classes.content]: true,
        [classes.fixedHeight]: fixedHeight,
      }, className)}
    >
      <Typography className={classes.title} variant="body1">
        {getMessage('allDay')}
      </Typography>
    </div>
  </StyledDiv>
));

TitleCellBase.propTypes = {
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  fixedHeight: PropTypes.bool,
};

TitleCellBase.defaultProps = {
  className: undefined,
  fixedHeight: false,
};

export const TitleCell = (TitleCellBase);
