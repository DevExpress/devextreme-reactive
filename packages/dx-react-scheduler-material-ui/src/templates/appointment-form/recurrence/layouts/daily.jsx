import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  NUMBER_EDITOR,
} from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  label: {
    width: '8em',
    paddingTop: theme.spacing(5),
  },
  textEditor: {
    width: '4em',
  },
});

const LayoutBase = ({
  textEditorComponent: TextEditor,
  labelComponent: Label,
  onRecurrenceOptionsChange,
  classes,
  getMessage,
  readOnly,
  recurrenceOptions,
  ...restProps
}) => (
  <Grid
    container
    direction="row"
    justify="flex-start"
    {...restProps}
  >
    <Label
      label={getMessage('repeatEveryLabel')}
      className={classes.label}
    />
    <TextEditor
      readOnly={readOnly}
      value={recurrenceOptions.interval}
      className={classes.textEditor}
      id={NUMBER_EDITOR}
      onValueChange={value => onRecurrenceOptionsChange({ ...recurrenceOptions, interval: value })}
    />
    <Label
      label={getMessage('daysLabel')}
      className={classes.label}
    />
  </Grid>
);

LayoutBase.propTypes = {
  recurrenceSwitcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onRecurrenceOptionsChange: PropTypes.func,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  recurrenceEditing: PropTypes.bool.isRequired,
  style: PropTypes.object,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
};

LayoutBase.defaultProps = {
  onRecurrenceOptionsChange: () => undefined,
  className: undefined,
  style: null,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
