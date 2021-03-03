import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classNames from 'clsx';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import { NUMBER_EDITOR } from '@devexpress/dx-scheduler-core';

const styles = ({ spacing }) => ({
  textEditor: {
    width: 'calc((100% - 5.5em) * 4 / 7)',
    minWidth: 'calc(100% - 13.5em)',
    marginLeft: '1em',
  },
  label: {
    width: '4.5em',
  },
  select: {
    width: 'calc((100% - 5.5em) * 3 / 7)',
    maxWidth: '8em',
  },
  formControl: {
    marginRight: 0,
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  controlLabel: {
    width: '100%',
  },
});

const ChangeMonthEditorBase = React.memo(({
  classes,
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  selectComponent: Select,
  readOnly,
  readOnlyEditors,
  month,
  changeMonth,
  months,
  dayNumber,
  changeByMonthDay,
  className,
  ...restProps
}) => (
  <FormControlLabel
    value="onDayAndMonth"
    className={classNames(classes.formControl, className)}
    classes={{ label: classes.controlLabel }}
    control={<Radio color="primary" />}
    disabled={readOnly}
    {...restProps}
    label={(
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Label
          text={getMessage('everyLabel')}
          className={classes.label}
        />
        <Select
          className={classes.select}
          value={month}
          onValueChange={changeMonth}
          readOnly={readOnlyEditors}
          availableOptions={months}
        />
        <TextEditor
          className={classes.textEditor}
          readOnly={readOnlyEditors}
          value={dayNumber}
          type={NUMBER_EDITOR}
          onValueChange={changeByMonthDay}
        />
      </Grid>
    )}
  />
));

ChangeMonthEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  readOnly: PropTypes.bool,
  month: PropTypes.number.isRequired,
  changeMonth: PropTypes.func.isRequired,
  months: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  dayNumber: PropTypes.number.isRequired,
  changeByMonthDay: PropTypes.func.isRequired,
  className: PropTypes.string,
  readOnlyEditors: PropTypes.bool,
};

ChangeMonthEditorBase.defaultProps = {
  getMessage: () => undefined,
  readOnly: false,
  className: undefined,
  readOnlyEditors: false,
};

export const ChangeMonthEditor = withStyles(styles)(ChangeMonthEditorBase, { name: 'ChangeMonthEditor' });
