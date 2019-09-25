import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  NUMBER_EDITOR,
  getRecurrenceOptions,
  changeRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';
import { Container } from './container';

const styles = {
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
};

const DailyBase = ({
  weeklyRecurrenceSelectorComponent,
  radioGroupComponent,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  classes,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  selectComponent,
  className,
  formatDate,
  firstDayOfWeek,
  ...restProps
}) => {
  const { rRule } = appointmentData;
  const recurrenceOptions = React.useMemo(() => getRecurrenceOptions(rRule) || {}, [rRule]);

  const changeRecurrenceInterval = React.useCallback(interval => interval > 0 && onFieldChange({
    rRule: changeRecurrenceOptions({ ...recurrenceOptions, interval }),
  }), [recurrenceOptions, onFieldChange]);
  return (
    <Container
      className={className}
      {...restProps}
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
        text={getMessage('daysLabel')}
        className={classes.labelWithMargin}
      />
    </Container>
  );
};

DailyBase.propTypes = {
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
  className: PropTypes.string,
  formatDate: PropTypes.func.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
};

DailyBase.defaultProps = {
  onFieldChange: () => undefined,
  readOnly: false,
  className: undefined,
};

export const Daily = withStyles(styles)(DailyBase, { name: 'Daily' });
