export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <Series
            type="bar"
            valueField="population"
            argumentField="year"
          />
        </Chart>
      </React.Fragment>
    );
}