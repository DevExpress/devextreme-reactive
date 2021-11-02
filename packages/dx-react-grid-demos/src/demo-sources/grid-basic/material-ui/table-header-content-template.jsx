import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { styled } from '@mui/material/styles';
import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const PREFIX = 'Demo';
const classes = {
  cebuttonll: `${PREFIX}-button`,
};
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [`&.${classes.button}`]: {
    margin: theme.spacing(0, 1),
  },
}));

const TableHeaderContent = ({
  column, children, ...restProps
}) => (
  <TableHeaderRow.Content
    column={column}
    {...restProps}
  >
    {children}
    {column.name === 'region' ? (
      <StyledIconButton
        className={classes.button}
        // eslint-disable-next-line no-alert
        onClick={() => alert('Custom action')}
        size="large"
      >
        <VisibilityOff />
      </StyledIconButton>
    ) : null}
  </TableHeaderRow.Content>
);

export default () => {
  const [columns] = useState([
    { name: 'region', title: 'Region' },
    { name: 'sector', title: 'Sector' },
    { name: 'customer', title: 'Customer' },
  ]);
  const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <Table />
        <TableHeaderRow
          contentComponent={TableHeaderContent}
        />
      </Grid>
    </Paper>
  );
};
