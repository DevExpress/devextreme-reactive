import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { TicksLayout } from './ticks-layout';

const styles = ({ spacing }) => ({
  timeScale: {
    width: `calc(100% - ${spacing(1)}px)`,
  },
  ticks: {
    width: spacing(1),
  },
});

const LayoutBase = ({
  labelComponent: Label,
  rowComponent: Row,
  tickCellComponent: TickCell,
  cellsData,
  formatDate,
  classes,
  ...restProps
}) => (
  <Grid container direction="row" {...restProps}>
    <div className={classes.timeScale}>
      <Label key={cellsData[0][0].startDate} />
      {cellsData.map((days, index) => (
        index !== cellsData.length - 1 && (
          <Label
            time={days[0].endDate}
            formatDate={formatDate}
            key={days[0].endDate}
          />
        )
      ))}
      <Label key={cellsData[cellsData.length - 1][0].endDate} />
    </div>
    <TicksLayout
      rowComponent={Row}
      cellComponent={TickCell}
      cellsData={cellsData}
      className={classes.ticks}
    />
  </Grid>
);

LayoutBase.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  tickCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  formatDate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
