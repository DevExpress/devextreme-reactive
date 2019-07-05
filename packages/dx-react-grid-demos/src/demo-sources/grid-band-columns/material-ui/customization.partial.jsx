// BLOCK:imports
import { withStyles } from '@material-ui/core/styles';
import Equalizer from '@material-ui/icons/Equalizer';
import People from '@material-ui/icons/People';
import PieChart from '@material-ui/icons/PieChart';
// BLOCK:imports

// BLOCK:body
const cellStyles = theme => ({
  icon: {
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
    verticalAlign: 'middle',
  },
});

const BandCellBase = ({
  children, tableRow, tableColumn, column, classes, ...restProps
}) => {
  let icon = null;
  if (column.title === 'Population') icon = <People className={classes.icon} />;
  if (column.title === 'Nominal GDP') icon = <Equalizer className={classes.icon} />;
  if (column.title === 'By Sector') icon = <PieChart className={classes.icon} />;
  return (
    <TableBandHeader.Cell
      {...restProps}
      column={column}
    >
      <strong>
        {children}
        {icon}
      </strong>
    </TableBandHeader.Cell>
  );
};

const BandCell = withStyles(cellStyles, { name: 'BandCell' })(BandCellBase);

const headerCellStyles = theme => ({
  text: {
    color: theme.palette.secondary.light,
  },
});

const HeaderCellBase = ({ classes, className, ...restProps }) => (
  <TableHeaderRow.Cell
    {...restProps}
    className={`${classes.text} ${className}`}
  />
);

const HeaderCell = withStyles(headerCellStyles, { name: 'HeaderCellBase' })(HeaderCellBase);
// BLOCK:body
