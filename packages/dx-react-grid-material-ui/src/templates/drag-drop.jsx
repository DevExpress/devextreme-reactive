import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Typography } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

export const styleSheet = createStyleSheet('DragDrop', theme => ({
  container: {
    cursor: 'move',
    position: 'fixed',
    zIndex: 1000,
    left: 0,
    top: 0,
    display: 'inline-block',
  },
  column: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    float: 'right',
  },
}));

const ContainerBase = ({
  clientOffset, columns, columnTemplate, classes,
}) => (
  <Paper
    className={classes.container}
    style={{
      transform: `translate(calc(${clientOffset.x}px - 50%), calc(${clientOffset.y}px - 50%))`,
    }}
  >
    {columns
      .map(column => React.cloneElement(
        columnTemplate({ column }),
        { key: column.name },
      ))}
  </Paper>
);

ContainerBase.propTypes = {
  clientOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  columns: PropTypes.array.isRequired,
  columnTemplate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Container = withStyles(styleSheet)(ContainerBase);

const ColumnBase = ({ column, classes }) => (
  <Typography
    className={classes.column}
    type="body1"
    component="p"
  >
    {column.title}
  </Typography>
);

ColumnBase.propTypes = {
  column: PropTypes.shape().isRequired,
  classes: PropTypes.object.isRequired,
};

export const Column = withStyles(styleSheet)(ColumnBase);
