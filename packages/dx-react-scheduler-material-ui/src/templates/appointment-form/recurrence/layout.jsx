import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { END_REPEAT_RADIO_GROUP } from '@devexpress/dx-scheduler-core';
import classNames from 'classnames';
import { Layout as DailyLayout } from './layouts/daily';
import { Layout as WeeklyLayout } from './layouts/weekly';
import { Layout as MonthlyLayout } from './layouts/monthly';
import { Layout as YearyLayout } from './layouts/yearly';

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
  changeAppointment,
  frequency,
  children,
  classes,
  className,
  getMessage,
  readOnly,
  recurrenceOptions,
  changeAppointmentField,
  changedAppointment,
  switcherComponent: Switcher,
  ...restProps
} ) => {
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
        MainLayoutComponent = YearyLayout;
        break;
      default:
        break;
    }
    return (
      <div className={classNames(classes.root, className)}>
        <Label
          label={getMessage('repeatLabel')}
        />
        <RecurenceSwitcher />
        <MainLayoutComponent
          recurrenceOptions={recurrenceOptions}
          textEditorComponent={TextEditor}
          labelComponent={Label}
          onRecurrenceOptionsChange={onRecurrenceOptionsChange}
          getMessage={getMessage}
          readOnly={readOnly}
          changeAppointment={changeAppointment}
          radioGroupEditorComponent={RadioGroupEditor}
          changedAppointment={changedAppointment}
          changeAppointmentField={changeAppointmentField}
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
  onRecurrenceOptionsChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  recurrenceEditing: PropTypes.bool.isRequired,
  style: PropTypes.object,
  onRRuleChange: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  recurrenceOptions: PropTypes.object.isRequired,
};

LayoutBase.defaultProps = {
  className: undefined,
  style: null,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
