export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData} height={height}>
          <Series
            name="Series name"
            valueField="ch"
            argumentField="year"
            type="area"
          />
          <Title text="Title" />
          <Legend visible={true} />
        </Chart>
      </React.Fragment>
    );
}