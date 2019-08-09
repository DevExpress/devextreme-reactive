import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { END_REPEAT_RADIO_GROUP, TITLE_LABEL } from '@devexpress/dx-scheduler-core';
import classNames from 'classnames';
import { Daily as DailyLayout } from './layouts/daily';
import { Weekly as WeeklyLayout } from './layouts/weekly';
import { Monthly as MonthlyLayout } from './layouts/monthly';
import { Yearly as YearlyLayout } from './layouts/yearly';

const styles = theme => ({
  root: {
    overflowY: 'auto',
    padding: theme.spacing(3),
    width: '50%',
  },
  label: {
    width: '8em',
    paddingTop: theme.spacing(5),
  },
  textEditor: {
    width: '4em',
  },
});

const LayoutBase = ({
  recurrenceSwitcherComponent: RecurenceSwitcher,
  radioGroupEditorComponent: RadioGroupEditor,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  dateAndTimeEditorComponent: DateAndTimeEditor,
  onRecurrenceOptionsChange,
  booleanEditorComponent: BooleanEditor,
  switcherComponent: Switcher,
  frequency,
  children,
  classes,
  className,
  getMessage,
  readOnly,
  recurrenceOptions,
  onAppointmentFieldChange,
  changedAppointment,
  ...restProps
}) => {
  let MainLayoutComponent = null;
  if (recurrenceOptions) {
    switch (frequency) {
      case 'daily':
        MainLayoutComponent = DailyLayout;
        break;
      case 'weekly':
        MainLayoutComponent = WeeklyLayout;
        break;
      case 'monthly':
        MainLayoutComponent = MonthlyLayout;
        break;
      case 'yearly':
        MainLayoutComponent = YearlyLayout;
        break;
      default:
        break;
    }
    return (
      <div
        className={classNames(classes.root, className)}
        {...restProps}
      >
        <Label
          label={getMessage('repeatLabel')}
          id={TITLE_LABEL}
        />
        <RecurenceSwitcher />
        <MainLayoutComponent
          recurrenceOptions={recurrenceOptions}
          textEditorComponent={TextEditor}
          labelComponent={Label}
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          getMessage={getMessage}
          readOnly={readOnly}
          radioGroupEditorComponent={RadioGroupEditor}
          changedAppointment={changedAppointment}
          onAppointmentFieldChange={onAppointmentFieldChange}
          booleanEditorComponent={BooleanEditor}
          switcherComponent={Switcher}
          {...restProps}
        />
        <Label
          label={getMessage('endRepeatLabel')}
        />
        <RadioGroupEditor
          id={END_REPEAT_RADIO_GROUP}
          readOnly={readOnly}
          getMessage={getMessage}
          textEditorComponent={TextEditor}
          labelComponent={Label}
          recurrenceOptions={recurrenceOptions}
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          dateAndTimeEditorComponent={DateAndTimeEditor}
          changedAppointment={changedAppointment}
        />
        {children}
      </div>
    );
  }
  return null;
};

LayoutBase.propTypes = {
  recurrenceSwitcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateAndTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  booleanEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onRecurrenceOptionsChange: PropTypes.func,
  onAppointmentFieldChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  recurrenceOptions: PropTypes.object.isRequired,
  changedAppointment: PropTypes.object.isRequired,
  frequency: PropTypes.string.isRequired,
};

LayoutBase.defaultProps = {
  className: undefined,
  onRecurrenceOptionsChange: () => undefined,
  onAppointmentFieldChange: () => undefined,
  readOnly: false,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
