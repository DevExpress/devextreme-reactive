// BLOCK:imports
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';
import MuiGrid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Edit from '@mui/icons-material/Edit';
import Cancel from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment';

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
        <FormGroup>
          <TextField
            margin="normal"
            name="Prefix"
            label="Title"
            value={row.Prefix}
            onChange={processValueChange}
          />
          <TextField
            margin="normal"
            name="LastName"
            label="Last Name"
            value={row.LastName}
            onChange={processValueChange}
          />
          <TextField
            margin="normal"
            label="State"
            select
            name="StateID"
            value={row.StateID}
            onChange={processValueChange}
          >
            {states.map(({ ID, Name }) => (
              <MenuItem key={ID} value={ID}>
                {Name}
              </MenuItem>
            ))}
          </TextField>
        </FormGroup>
      </MuiGrid>
      <MuiGrid item xs={6}>
        <FormGroup>
          <TextField
            margin="normal"
            name="FirstName"
            label="First Name"
            value={row.FirstName}
            onChange={processValueChange}
          />
          <TextField
            margin="normal"
            name="Position"
            label="Position"
            value={row.Position}
            onChange={processValueChange}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              renderInput={props => <TextField {...props} margin="normal" label="Birth Date" />}
              value={row.BirthDate}
              onChange={value => processValueChange({
                target: { name: 'BirthDate', value: value.toDate() },
              })}
              inputFormat="MM/DD/YYYY"
            />
          </LocalizationProvider>
        </FormGroup>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <FormGroup>
          <TextField
            margin="normal"
            name="Notes"
            label="Notes"
            multiline
            maxRows={4}
            value={row.Notes}
            onChange={processValueChange}
          />
        </FormGroup>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <MuiGrid container spacing={3} justifyContent="flex-end">
          <MuiGrid item>
            <Button onClick={applyChanges} variant="text" color="primary">
              Save
            </Button>
          </MuiGrid>
          <MuiGrid item>
            <Button onClick={cancelChanges} color="secondary">
              Cancel
            </Button>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
};

const styles = theme => ({
  toggleCell: {
    textAlign: 'center',
    textOverflow: 'initial',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
  },
  toggleCellButton: {
    verticalAlign: 'middle',
    display: 'inline-block',
    padding: theme.spacing(1),
  },
});

const ToggleCellBase = ({
  style, expanded, classes, onToggle,
  tableColumn, tableRow, row,
  className,
  ...restProps
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };
  return (
    <TableCell
      className={classNames(classes.toggleCell, className)}
      style={style}
      {...restProps}
    >
      <IconButton className={classes.toggleCellButton} onClick={handleClick} size="large">
        {
          expanded
            ? <Cancel />
            : <Edit />
        }
      </IconButton>
    </TableCell>
  );
};

const ToggleCell = withStyles(styles, { name: 'ToggleCell' })(ToggleCellBase);
// BLOCK:detailContent
