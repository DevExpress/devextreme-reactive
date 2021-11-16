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

const StyledDivContainer = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    userSelect: 'none',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  [`&.${classes.fixedHeight}`]: {
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL]),
    width: '100%',
  },
}));

const StyledDivContent = styled('div')(({ theme }) => ({
  [`&.${classes.content}`]: {
    width: theme.spacing(10),
    boxSizing: 'border-box',
    height: theme.spacing(5.75),
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  [`&.${classes.fixedHeight}`]: {
    height: theme.spacing(SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL]),
    width: '100%',
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  [`&.${classes.title}`]: {
    paddingRight: theme.spacing(2),
    ...theme.typography.caption,
    color: theme.palette.text.secondary,
  },
}));

export const TitleCellBase = React.memo(({
  getMessage, className, fixedHeight, ...restProps
}) => (
  <StyledDivContainer
    className={classNames({
      [classes.container]: true,
      [classes.fixedHeight]: fixedHeight,
    }, className)}
    {...restProps}
  >
    <StyledDivContent
      className={classNames({
        [classes.content]: true,
        [classes.fixedHeight]: fixedHeight,
      }, className)}
    >
      <StyledTypography className={classes.title} variant="body1">
        {getMessage('allDay')}
      </StyledTypography>
    </StyledDivContent>
  </StyledDivContainer>
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
