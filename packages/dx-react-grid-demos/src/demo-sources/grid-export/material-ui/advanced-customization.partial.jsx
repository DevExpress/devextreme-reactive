// BLOCK:imports
import { makeStyles } from '@material-ui/core/styles';
// BLOCK:imports

// BLOCK:body
const useGroupStyles = makeStyles({
  groupRow: ({ groupedBy }) => ({
    backgroundColor: `#${groupColors[groupedBy]}`,
  }),
  content: {
    backgroundColor: 'inherit !important',
  },
});

const GroupRow = (props) => {
  const { row } = props;
  const classes = useGroupStyles(row);
  return <TableGroupRow.Row {...props} className={classes.groupRow} />;
};

const GroupIndentCell = (props) => {
  const classes = useGroupStyles();
  return (
    <TableGroupRow.IndentCell {...props} className={classes.content} />
  );
};

const GroupCellContainer = (props) => {
  const classes = useGroupStyles();
  return (
    <TableGroupRow.Container {...props} className={classes.content} />
  );
};

const useCellStyles = makeStyles({
  cell: ({ row, column }) => getCellStyle(row, column),
});

const Cell = (props) => {
  const classes = useCellStyles(props);
  return (
    <Table.Cell {...props} className={classes.cell} />
  );
};
// BLOCK:body
