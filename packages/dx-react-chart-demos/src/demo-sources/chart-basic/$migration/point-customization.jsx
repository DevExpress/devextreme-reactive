export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <CommonSeriesSettings argumentField="argument" type="line">
            <Point>
              <Border color="white" width={1} />
            </Point>
          </CommonSeriesSettings>
          <Series valueField="constantValue">
            <Point symbol="polygon" />
          </Series>
          <Series valueField="linearValue">
            <Point symbol="cross" />
          </Series>
          <Series valueField="powValue">
            <Point image='/static/assets/images/star.png' />
          </Series>
        </Chart>
      </React.Fragment>
    );
}