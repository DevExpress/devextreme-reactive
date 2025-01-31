export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData} height={height}>
          <CommonSeriesSettings
            argumentField="state"
            type="stackedbar"
          />
          <Series
            name="👶 Young"
            valueField="young"
          />
          <Series
            name="🧑 Adult"
            valueField="middle"
          />
          <Series
            name="🧓 Old"
            valueField="older"
          />
          <Title
            text='👪 Population'
            horizontalAlignment='left'
          >
            <Font size={24} />
            <Margin bottom={16} />
          </Title>
        </Chart>
      </React.Fragment>
    );
}