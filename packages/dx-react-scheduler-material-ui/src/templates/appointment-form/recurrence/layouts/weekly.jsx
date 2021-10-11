import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import { getRecurrenceOptions, changeRecurrenceOptions, checkIsNaturalNumber } from '@devexpress/dx-scheduler-core';
import { IntervalEditor } from './interval-editor';

const styles = theme => ({
  container: {
    marginBottom: theme.spacing(2),
  },
});

const WeeklyBase = ({
  radioGroupComponent,
  textEditorComponent,
  labelComponent,
  classes,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  selectComponent,
  weeklyRecurrenceSelectorComponent: WeeklyRecurrenceSelector,
  formatDate,
  firstDayOfWeek,
  ...restProps
}) => {
  const { rRule } = appointmentData;
  const recurrenceOptions = React.useMemo(() => getRecurrenceOptions(rRule) || {}, [rRule]);

  const changeRecurrenceInterval = React.useCallback(
    interval => checkIsNaturalNumber(interval) && onFieldChange({
      rRule: changeRecurrenceOptions({ ...recurrenceOptions, interval }),
    }), [recurrenceOptions, onFieldChange],
  );
  return (
    <div
      {...restProps}
    >
      <IntervalEditor
        className={classes.container}
        repeatEveryLabel={getMessage('repeatEveryLabel')}
        repeatIntervalLabel={getMessage('weeksOnLabel')}
        textEditorComponent={textEditorComponent}
        labelComponent={labelComponent}
        changeRecurrenceInterval={changeRecurrenceInterval}
        interval={recurrenceOptions.interval}
        readOnly={readOnly}
        {...restProps}
      />
      <WeeklyRecurrenceSelector
        rRule={appointmentData.rRule}
        onValueChange={onFieldChange}
        readOnly={readOnly}
        formatDate={formatDate}
        firstDayOfWeek={firstDayOfWeek}
      />
    </div>
  );
};

WeeklyBase.propTypes = {
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
  firstDayOfWeek: PropTypes.number.isRequired,
};

WeeklyBase.defaultProps = {
  onFieldChange: () => undefined,
  readOnly: false,
};

export const Weekly = withStyles(styles)(WeeklyBase, { name: 'Weekly' });
