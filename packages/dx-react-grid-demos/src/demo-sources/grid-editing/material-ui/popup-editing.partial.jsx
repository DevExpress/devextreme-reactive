// BLOCK:imports
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiGrid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
// BLOCK:imports

// BLOCK:dialog
const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}) => (
  <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
    <DialogContent>
      <MuiGrid container spacing={3}>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="firstName"
              label="First Name"
              value={row.firstName || ''}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              name="prefix"
              label="Title"
              value={row.prefix || ''}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              name="position"
              label="Position"
              value={row.position || ''}
              onChange={onChange}
            />
          </FormGroup>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="lastName"
              label="Last Name"
              value={row.lastName || ''}
              onChange={onChange}
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                label="Birth Date"
                margin="normal"
                value={row.birthDate}
                onChange={(_, value) => onChange({
                  target: { name: 'birthDate', value },
                })}
                format="DD/MM/YYYY"
              />
            </MuiPickersUtilsProvider>
            <TextField
              margin="normal"
              name="phone"
              label="Phone"
              value={row.phone || ''}
              onChange={onChange}
            />
          </FormGroup>
        </MuiGrid>
      </MuiGrid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancelChanges} color="primary">
        Cancel
      </Button>
      <Button onClick={onApplyChanges} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);
// BLOCK:dialog