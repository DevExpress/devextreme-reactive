const format = formatPrefix('.1', 1e24);

export default () => {
  return (
    <React.Fragment>
      <Chart dataSource={chartData}>
        <ValueAxis
          type="logarithmic"
          logarithmBase={2}
        >
          <Label format={format} />
        </ValueAxis>
        <Series
          valueField="mass"
          argumentField="planet"
          type="scatter"
        />
        <Title
          text="Planetary mass (kg)"
        />
      </Chart>
    </React.Fragment>
  );
}