export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <CommonSeriesSettings argumentField="year" type="area" />
          <Series valueField="ru"/>
          <Series valueField="ch"/>
          <Series valueField="us"/>
        </Chart>
      </React.Fragment>
    );
}