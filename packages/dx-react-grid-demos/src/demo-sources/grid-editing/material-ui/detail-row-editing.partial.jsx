// BLOCK:imports
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
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
      <MuiGrid item xs={12} >
        <MuiGrid container spacing={3} justify="flex-end">
          <MuiGrid item >
            <Button onClick={applyChanges} variant="text" color="primary">
              Save
            </Button>
          </MuiGrid>
          <MuiGrid item >
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
      <IconButton
        className={classes.toggleCellButton}
        onClick={handleClick}
      >
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
