// BLOCK:imports
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MuiGrid from '@mui/material/Grid';
// eslint-disable-next-line
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                renderInput={props => <TextField margin="normal" {...props} />}
                label="Birth Date"
                value={row.BirthDate}
                onChange={value => onChange({
                  target: { name: 'BirthDate', value },
                })}
                inputFormat="DD/MM/YYYY"
              />
            </LocalizationProvider>
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
      <Button onClick={onCancelChanges} color="secondary">
        Cancel
      </Button>
      <Button onClick={onApplyChanges} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);
// BLOCK:dialog
