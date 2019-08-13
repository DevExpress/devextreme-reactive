import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { END_REPEAT_RADIO_GROUP, TITLE_LABEL, getRecurrenceOptions } from '@devexpress/dx-scheduler-core';
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
  },
  switcher: {
    marginBottom: theme.spacing(3.5),
  },
  repeatLabel: {
    marginBottom: theme.spacing(1),
  },
  radioGroup: {
    marginTop: theme.spacing(0.5),
  },
  endRepeatLabel: {
    marginTop: theme.spacing(2),
  },
});

const LayoutBase = ({
  recurrenceSwitcherComponent: RecurenceSwitcher,
  radioGroupEditorComponent: RadioGroupEditor,
  textEditorComponent: TextEditor,
  labelComponent: Label,
  dateAndTimeEditorComponent: DateAndTimeEditor,
  onRecurrenceOptionsChange,
  switcherComponent: Switcher,
  groupedButtonsComponent: GroupedButtons,
  frequency,
  children,
  classes,
  className,
  getMessage,
  readOnly,
  onAppointmentFieldChange,
  changedAppointment,
  ...restProps
}) => {
  let MainLayoutComponent = null;
  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
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
          className={classes.repeatLabel}
        />
        <RecurenceSwitcher
          className={classes.switcher}
        />
        <MainLayoutComponent
          textEditorComponent={TextEditor}
          labelComponent={Label}
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          getMessage={getMessage}
          readOnly={readOnly}
          radioGroupEditorComponent={RadioGroupEditor}
          changedAppointment={changedAppointment}
          onAppointmentFieldChange={onAppointmentFieldChange}
          switcherComponent={Switcher}
          groupedButtonsComponent={GroupedButtons}
          {...restProps}
        />
        <Label
          label={getMessage('endRepeatLabel')}
          className={classes.endRepeatLabel}
        />
        <RadioGroupEditor
          className={classes.radioGroup}
          id={END_REPEAT_RADIO_GROUP}
          readOnly={readOnly}
          getMessage={getMessage}
          textEditorComponent={TextEditor}
          labelComponent={Label}
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
  switcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groupedButtonsComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onRecurrenceOptionsChange: PropTypes.func,
  onAppointmentFieldChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
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
