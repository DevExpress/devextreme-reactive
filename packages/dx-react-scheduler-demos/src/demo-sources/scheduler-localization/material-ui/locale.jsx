import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { withStyles } from '@material-ui/core/styles';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

const allDayLocalizationMessages = {
  'fr-FR': {
    allDay: "Autour de l'horloge",
  },
  'de-GR': {
    allDay: 'Rund um die Uhr',
  },
  'en-US': {
    allDay: 'All Day',
  },
};

const getAllDayMessages = locale => allDayLocalizationMessages[locale];

const styles = theme => ({
  container: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 2,
    justifyContent: 'flex-end',
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing.unit * 2,
  },
});

const LocaleSwitcher = withStyles(styles, { name: 'LocaleSwitcher' })(
  ({ onLocaleChange, currentLocale, classes }) => (
    <div className={classes.container}>
      <div className={classes.text}>
      Locale:
      </div>
      <TextField
        select
        value={currentLocale}
        onChange={onLocaleChange}
      >
        <MenuItem value="fr-FR">Le français (fr-FR)</MenuItem>
        <MenuItem value="de-GR">Deutsch (de-GR)</MenuItem>
        <MenuItem value="en-US">American (en-US)</MenuItem>
      </TextField>
    </div>
  ),
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
      locale: 'fr-FR',
    };

    this.localeChange = event => this.setState({ locale: event.target.value });
  }

  render() {
    const { data, currentDate, locale } = this.state;

    return (
      <div>
        <LocaleSwitcher
          currentLocale={locale}
          onLocaleChange={this.localeChange}
        />
        <Paper>
          <Scheduler
            data={data}
            locale={locale}
          >
            <ViewState
              defaultCurrentDate={currentDate}
            />
            <WeekView
              startDayHour={9}
              endDayHour={19}
            />
            <Toolbar />
            <DateNavigator />
            <Appointments />
            <AllDayPanel
              messages={getAllDayMessages(locale)}
            />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
