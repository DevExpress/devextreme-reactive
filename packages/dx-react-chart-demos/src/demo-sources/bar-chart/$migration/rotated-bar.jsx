export default () => {
    return (
      <React.Fragment>
        <Chart
          dataSource={chartData}
          rotated={true}
        >
          <Series
            type="bar"
            valueField="population"
            argumentField="year"
          />
          <Title text="World population" />
        </Chart>
      </React.Fragment>
    );
}