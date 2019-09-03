import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  YEARLY_RADIO_GROUP,
  NUMBER_EDITOR,
  getRecurrenceOptions,
  changeRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  root: {
    overflowY: 'auto',
    padding: theme.spacing(3),
    width: '50%',
  },
  label: {
    width: '6.5em',
  },
  textEditor: {
    width: 'calc((100% - 7.5em) * 3 / 7)',
    maxWidth: '8em',
  },
  grid: {
    marginTop: theme.spacing(1.75),
  },
  labelWithMargin: {
    marginLeft: '1em',
    width: 'calc((100% - 7.5em) * 4 / 7)',
  },
  radioGroup: {
    marginTop: theme.spacing(1),
  },
});

const YearlyBase = ({
  radioGroupComponent: RadioGroup,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  classes,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  selectComponent,
  weeklyRecurrenceSelectorComponent,
  formatDate,
  ...restProps
}) => {
  const { rRule } = appointmentData;
  const recurrenceOptions = React.useMemo(() => getRecurrenceOptions(rRule), [rRule]);

  const changeRecurrenceInterval = React.useCallback(interval => interval > 0 && onFieldChange({
    rRule: changeRecurrenceOptions({ ...recurrenceOptions, interval }),
  }), [recurrenceOptions, onFieldChange]);
  return (
    <div {...restProps}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={classes.grid}
      >
        <Label
          text={getMessage('repeatEveryLabel')}
          className={classes.label}
        />
        <TextEditor
          readOnly={readOnly}
          value={recurrenceOptions.interval}
          className={classes.textEditor}
          type={NUMBER_EDITOR}
          onValueChange={changeRecurrenceInterval}
        />
        <Label
          text={getMessage('yearsLabel')}
          className={classes.labelWithMargin}
        />
      </Grid>
      <RadioGroup
        type={YEARLY_RADIO_GROUP}
        readOnly={readOnly}
        getMessage={getMessage}
        textEditorComponent={TextEditor}
        labelComponent={Label}
        onFieldChange={onFieldChange}
        appointmentData={appointmentData}
        selectComponent={selectComponent}
        formatDate={formatDate}
        className={classes.radioGroup}
        dateEditorComponent={() => null}
      />
    </div>
  );
};

YearlyBase.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  weeklyRecurrenceSelectorComponent: PropTypes.oneOfType([
    PropTypes.func, PropTypes.object,
  ]).isRequired,
  appointmentData: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  onFieldChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  formatDate: PropTypes.func.isRequired,
};

YearlyBase.defaultProps = {
  onFieldChange: () => undefined,
  readOnly: false,
};

export const Yearly = withStyles(styles)(YearlyBase, { name: 'Yearly' });
