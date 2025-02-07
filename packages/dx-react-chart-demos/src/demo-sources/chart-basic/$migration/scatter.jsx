export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <CommonSeriesSettings type="scatter" />
          <Series
            valueField="val1"
            argumentField="arg1"
          />
          <Series
            valueField="val2"
            argumentField="arg2"
          />
        </Chart>
      </React.Fragment>
    );
}