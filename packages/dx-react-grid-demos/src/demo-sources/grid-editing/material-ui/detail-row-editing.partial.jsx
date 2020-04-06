// BLOCK:imports
import Button from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
// BLOCK:imports

// BLOCK:detailContent
const DetailContent = ({ row, ...rest }) => {
  const {
    processValueChange,
    applyChanges,
    cancelChanges,
  } = rest;
  return (
    <MuiGrid container spacing={3}>
      <MuiGrid item xs={6}>
        <FormGroup >
          <TextField
            margin="normal"
            name="prefix"
            label="Title"
            value={row.prefix}
            onChange={processValueChange}
          />
          <TextField
            margin="normal"
            name="lastName"
            label="Last Name"
            value={row.lastName}
            onChange={processValueChange}
          />
          <TextField
            margin="normal"
            id="phone"
            label="Phone"
            value={row.phone}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            {/* <KeyboardDatePicker
              label="Birth Date"
              margin="normal"
              value={row.birthDate}
              format="DD/MM/YYYY"
              /> */}
          </MuiPickersUtilsProvider>
        </FormGroup>
      </MuiGrid>
      <MuiGrid item xs={6}>
        <FormGroup>
          <TextField
            margin="normal"
            id="name"
            label="First Name"
            value={row.firstName}
          />
          <TextField
            margin="normal"
            id="name"
            label="Position"
            value={row.position}
          />
          <TextField
            margin="normal"
            id="name"
            label="Address"
            value={row.address}
            multiline
            fullWidth
        />
        </FormGroup>
      </MuiGrid>
      <MuiGrid container spacing={3} justify="flex-end">
        <MuiGrid item xs={1}>
          <Button onClick={applyChanges} variant="text" color="primary">
            Save
          </Button>
        </MuiGrid>
        <MuiGrid item xs={1}>
          <Button onClick={cancelChanges} color="secondary">
            Cancel
          </Button>
        </MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
};
// BLOCK:detailContent