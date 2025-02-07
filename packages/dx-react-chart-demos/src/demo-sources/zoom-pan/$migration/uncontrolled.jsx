export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <Series
            type="line"
            valueField="y"
            argumentField="x"
          />
          <ZoomAndPan
            argumentAxis="both"
            valueAxis="none"
          />
        </Chart>
      </React.Fragment>
    );
}