import React from 'react';
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export,
  PieChartTypes,
} from 'devextreme-react/pie-chart';

export default () => {
  return (
    <React.Fragment>
      <PieChart
        dataSource={chartData}
      >
        <Series
          argumentField="country"
          valueField="area"
        />
      </PieChart>
    </React.Fragment>
  );
}