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
  onRRuleChange,
  style,
  getMessage,
  readOnly,
  recurrenceOptions,
  ...restProps
}) => {
  let MainLayoutComponent = null;
  if (recurrenceOptions) {
    switch (frequency) {
      case 'daily':
        MainLayoutComponent = props => (
          <DailyLayout {...props} />
        );
        break;
      case 'weekly':
        MainLayoutComponent = props => (
          <WeeklyLayout
            booleanEditorComponent={BooleanEditor}
            {...props}
          />
        );
        break;
      case 'monthly':
        MainLayoutComponent = props => (
          <MonthlyLayout
            radioGroupEditorComponent={RadioGroupEditor}
            {...props}
          />
        );
        break;
      case 'yearly':
        MainLayoutComponent = props => (
          <YearyLayout
            radioGroupEditorComponent={RadioGroupEditor}
            {...props}
          />
        );
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
