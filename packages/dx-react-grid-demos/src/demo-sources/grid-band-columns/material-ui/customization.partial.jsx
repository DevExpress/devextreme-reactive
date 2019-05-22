import { withStyles } from '@material-ui/core/styles';
import Equalizer from '@material-ui/icons/Equalizer';
import People from '@material-ui/icons/People';
import PieChart from '@material-ui/icons/PieChart';

const cellStyles = theme => ({
  icon: {
    marginBottom: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit,
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
