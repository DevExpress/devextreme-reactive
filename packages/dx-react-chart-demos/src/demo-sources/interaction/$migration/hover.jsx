export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <Series
            type="bar"
            valueField="population"
            argumentField="year"
            hoverMode="onlyPoint"
          />
        </Chart>
      </React.Fragment>
    );
}