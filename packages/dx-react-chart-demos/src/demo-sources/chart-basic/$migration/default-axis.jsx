export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <CommonSeriesSettings argumentField="argument" />
          <Series valueField="lineValue" type="line" />
          <Series valueField="splineValue" type="spline" />
        </Chart>
      </React.Fragment>
    );
}