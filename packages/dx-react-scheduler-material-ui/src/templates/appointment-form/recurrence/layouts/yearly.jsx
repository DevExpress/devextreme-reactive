import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import {
  YEARLY_RADIO_GROUP,
  getRecurrenceOptions,
  changeRecurrenceOptions,
  checkIsNaturalNumber,
} from '@devexpress/dx-scheduler-core';
import { IntervalEditor } from './interval-editor';

const PREFIX = 'Yearly';

export const classes = {
  radioGroup: `${PREFIX}-radioGroup`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`& .${classes.radioGroup}`]: {
    marginTop: theme.spacing(1),
  },
}));

const YearlyBase = ({
  radioGroupComponent: RadioGroup,
  textEditorComponent,
  labelComponent,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  selectComponent,
  weeklyRecurrenceSelectorComponent,
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
    <StyledDiv {...restProps}>
      <IntervalEditor
        repeatEveryLabel={getMessage('repeatEveryLabel')}
        repeatIntervalLabel={getMessage('yearsLabel')}
        textEditorComponent={textEditorComponent}
        labelComponent={labelComponent}
        changeRecurrenceInterval={changeRecurrenceInterval}
        interval={recurrenceOptions.interval}
        readOnly={readOnly}
        {...restProps}
      />
      <RadioGroup
        type={YEARLY_RADIO_GROUP}
        readOnly={readOnly}
        getMessage={getMessage}
        textEditorComponent={textEditorComponent}
        labelComponent={labelComponent}
        onFieldChange={onFieldChange}
        appointmentData={appointmentData}
        selectComponent={selectComponent}
        formatDate={formatDate}
        className={classes.radioGroup}
        dateEditorComponent={() => null}
        firstDayOfWeek={firstDayOfWeek}
      />
    </StyledDiv>
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
  firstDayOfWeek: PropTypes.number.isRequired,
};

YearlyBase.defaultProps = {
  onFieldChange: () => undefined,
  readOnly: false,
};

export const Yearly = (YearlyBase);
