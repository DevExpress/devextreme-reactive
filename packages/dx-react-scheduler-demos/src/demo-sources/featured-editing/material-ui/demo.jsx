import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  AllDayPanel,
  DayView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

import { InlineDateTimePicker } from 'material-ui-pickers';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Notes from '@material-ui/icons/Notes';
import Palette from '@material-ui/icons/Palette';
import Lens from '@material-ui/icons/Lens';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { appointments } from '../../../demo-data/appointments';

const containerStyles = (theme) => {
  console.log(theme);
  return ({
    container: {
      width: '545px',
      padding: 0,
      paddingBottom: theme.spacing.unit * 2,
    },
    tabContainer: {
      padding: theme.spacing.unit * 2,
    },
    staticArea: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: `0 ${theme.spacing.unit * 2}px`,
      paddingBottom: 16,
      // backgroundColor: theme.palette.background.default,
    },
    paper: {
      borderRadius: 0,
    },
    title: {
      width: '100%',
    },
    topLevel: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    bottomLevel: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      // paddingBottom: theme.spacing.unit,
      padding: `0 ${theme.spacing.unit * 2}px`,
    },
    button: {
      marginLeft: theme.spacing.unit * 2,
    },

    picker: {
      marginTop: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      '&:last-child': {
        marginRight: 0,
      },
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: `${theme.spacing.unit}px 0px`,

    },
    icon: {
      margin: `${theme.spacing.unit * 2}px 0`,
    },
    location: {
      width: '470px',
    },
    color: {
      marginRight: theme.spacing.unit,
    },
  // notes: {
  //   width: '450px',
  //   height: '100px',
  // },
  });
};
class appointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
    } = this.props;
    const { value } = this.state;

    return (
      <AppointmentForm.Popup
        visible={visible}
      >
        <AppointmentForm.Container className={classes.container}>
          <Paper className={classes.paper}>
            <AppointmentForm.StaticArea className={classes.staticArea}>
              <div className={classes.topLevel}>
                <TextField
                  label="Title"
                  className={classes.title}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className={classes.bottomLevel}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <InlineDateTimePicker
                    className={classes.picker}
                    keyboard
                    label="Start Date"
                    value="2018-01-01T00:00:00.000Z"
                // onChange={this.handleDateChange}
                    variant="outlined"
                    format="DD/MM/yyyy"
                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                    onChange={() => undefined}
                  />
                  <InlineDateTimePicker
                    className={classes.picker}
                    keyboard
                    label="End Date"
                    value="2018-01-01T00:00:00.000Z"
                // onChange={this.handleDateChange}
                    variant="outlined"
                    format="DD/MM/yyyy"
                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                    onChange={() => undefined}
                  />
                </MuiPickersUtilsProvider>
                {/* <TextField
                variant="outlined"
                label="End Date"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.picker}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
              </div>
            </AppointmentForm.StaticArea>
            {/* <AppBar position="static" color="default"> */}
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="General" />
              <Tab label="Notes" />
            </Tabs>
            {/* </AppBar> */}
          </Paper>
          {value === 0 && (
          <div className={classes.tabContainer}>
            <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color="action" />
              <TextField
                label="Location"
                className={classes.location}
            // value={this.state.name}
            // onChange={this.handleChange('name')}
                variant="outlined"
              />
            </div>

            <div className={classes.wrapper}>
              <Notifications className={classes.icon} color="action" />
              <TextField
                label="Notification"
                className={classes.location}
            // value={this.state.name}
            // onChange={this.handleChange('name')}
                variant="outlined"
              />
            </div>

            <div className={classes.wrapper}>
              <Palette className={classes.icon} color="action" />
              <FormControl variant="outlined">
                <InputLabel
                  htmlFor="outlined-age-simple"
                  ref={(ref) => {
                    this.InputLabelRef = ref;
                  }}
                >
                  Color
                </InputLabel>
                <Select
              // value={this.state.age}
              // onChange={this.handleChange}
                  className={classes.location}
                  labelWidth={37}
                  input={(
                    <OutlinedInput
                  // labelWidth={this.state.labelWidth}
                      id="outlined-age-simple"
                    />
                )}
                >
                  <MenuItem value="#E91E63">
                    <Lens className={classes.color} style={{ fill: '#E91E63' }} />
                      Pink
                  </MenuItem>
                  <MenuItem value="#9C27B0">
                    <Lens className={classes.color} style={{ fill: '#9C27B0' }} />
                      Purple
                  </MenuItem>
                  <MenuItem value="#03A9F4">
                    <Lens className={classes.color} style={{ fill: '#03A9F4' }} />
                      Light Blue
                  </MenuItem>
                  <MenuItem value="#FFEB3B">
                    <Lens className={classes.color} style={{ fill: '#FFEB3B' }} />
                      Yellow
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          )}
          {value === 1 && (
          <div className={classes.tabContainer}>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField
                label="Notes"
                className={classes.location}
                multiline
                rows="9"
            // value={this.state.name}
            // onChange={this.handleChange('name')}
                variant="outlined"
              />
            </div>
          </div>
          )}
          <div className={classes.buttonGroup}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => {
                visibleChange();
              }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
              }}
            >
              Save
            </Button>
          </div>
        </AppointmentForm.Container>
      </AppointmentForm.Popup>
    );
  }
}

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(appointmentFormContainerBasic);

const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  },
  popper: {
    paddingRight: theme.spacing.unit,
  },
});

/* eslint-disable-next-line react/no-multi-comp */
class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-06-28',
      deletedAppointmentId: null,
      confirmationVisible: false,
      open: true, // !
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  openForm() {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    const { data, deletedAppointmentId } = this.state;
    const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);
    this.setState({ data: nextData, deletedAppointmentId: null });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    let { data } = this.state;
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [
        ...data,
        {
          id: startingAddedId,
          ...added,
        },
      ];
    }
    if (changed) {
      data = data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    }
    if (deleted) {
      this.setDeletedAppointmentId(deleted);
      this.toggleConfirmationVisible();
    }
    this.setState({ data });
  }

  render() {
    const {
      currentDate, data, confirmationVisible, open,
    } = this.state;
    const { classes } = this.props;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />

          <WeekView
            startDayHour={9}
            endDayHour={19}
          />
          <DayView
            startDayHour={9}
            endDayHour={19}
          />
          <Appointments />
          <Toolbar />
          <AllDayPanel />
          <ViewSwitcher />
          <AppointmentForm
            popupComponent={() => (
              <AppointmentFormContainer
                visible={open}
                visibleChange={this.openForm}
              />
            )}
            visible={open}
            onVisibilityChange={this.openForm}
          />
        </Scheduler>

        <Dialog
          open={confirmationVisible}
          onClose={this.cancelDelete}
        >
          <DialogTitle>
            Delete Appointment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmationVisible} color="primary">
              Cancel
            </Button>
            <Button onClick={this.commitDeletedAppointment} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Tooltip
          title="Add Appointment"
          placement="left"
          disableFocusListener
        >
          <Button
            variant="fab"
            color="secondary"
            className={classes.addButton}
            onClick={this.openForm}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </Paper>
    );
  }
}

export default withStyles(styles, { name: 'EditingDemo' })(Demo);
