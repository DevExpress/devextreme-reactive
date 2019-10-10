import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'clsx';
import { NUMBER_EDITOR } from '@devexpress/dx-scheduler-core';

const styles = ({ spacing }) => ({
  grid: {
    marginTop: spacing(1.75),
  },
  label: {
    width: '6.5em',
  },
  labelWithMargin: {
    marginLeft: '1em',
    width: 'calc((100% - 7.5em) * 4 / 7)',
  },
  textEditor: {
    width: 'calc((100% - 7.5em) * 3 / 7)',
    maxWidth: '8em',
  },
});

const IntervalEditorBase = ({
  classes,
  className,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  repeatEveryLabel,
  repeatIntervalLabel,
  readOnly,
  interval,
  changeRecurrenceInterval,
  ...restProps
}) => (
  <Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
    className={classNames(classes.grid, className)}
    {...restProps}
  >
    <Label
      text={repeatEveryLabel}
      className={classes.label}
    />
    <TextEditor
      readOnly={readOnly}
      value={interval}
      className={classes.textEditor}
      type={NUMBER_EDITOR}
      onValueChange={changeRecurrenceInterval}
    />
    <Label
      text={repeatIntervalLabel}
      className={classes.labelWithMargin}
    />
  </Grid>
);

IntervalEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  repeatEveryLabel: PropTypes.string.isRequired,
  repeatIntervalLabel: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  interval: PropTypes.number.isRequired,
  changeRecurrenceInterval: PropTypes.func.isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

IntervalEditorBase.defaultProps = {
  className: undefined,
};

export const IntervalEditor = withStyles(styles)(IntervalEditorBase, { name: 'IntervalEditor' });
