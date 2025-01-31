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
          <Legend
            itemTextPosition={'left'}
          >
            <Title
              text='👪 Population'
              horizontalAlignment='right'
            >
              <Font size={24} />
              <Margin left={24} right={24} />
            </Title>
          </Legend>
        </Chart>
      </React.Fragment>
    );
}