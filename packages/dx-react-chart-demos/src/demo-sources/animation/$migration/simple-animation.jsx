export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <ValueAxis
            name="total"
            position="right"
          />
          <ValueAxis
            name="sale"
          />
          <CommonSeriesSettings
            argumentField="month"
          />
          <Series
            name="Units Sold"
            valueField="sale"
            type="bar"
            axis="sale"
          />
          <Series
            name="Total Transactions"
            valueField="total"
            type="spline"
            axis="total"
          />
        </Chart>
      </React.Fragment>
    );
}