export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <Series
            type="bar"
            valueField="population"
            argumentField="year"
          />
          <Title
            text="World population (billion)"
          />
          <Tooltip
            enabled={true}
          />
        </Chart>
      </React.Fragment>
    );
}