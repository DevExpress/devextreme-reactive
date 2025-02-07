export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <CommonSeriesSettings argumentField="state" type="bar" />
          <Series valueField="young" name="Young" />
          <Series valueField="middle" name="Middle" />
          <Series valueField="older" name="Older" />
        </Chart>
      </React.Fragment>
    );
}