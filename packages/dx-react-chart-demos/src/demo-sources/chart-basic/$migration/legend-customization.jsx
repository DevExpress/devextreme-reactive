const markerPath = {
    'Original Signal': 'M 0 8 C 2 4 7 4 9.5 8 C 11 12 16 12 18 8 L 18 10 C 16 14 11 14 8.5 10 C 7 6 2 6 0 10 Z',
    'Noisy Signal': 'M 18 8 L 12 12 L 7 3 L 0 7.4 L 0 10 L 6 6 L 11 15 L 18 10.6 Z',
  };
  
  const markerRender = ({ series, marker: { fill } }) => {
    return (
      <svg>
        <rect x={0} y={0} width={18} height={18} fill={color} opacity={0.3}></rect>
        <path d={markerPath[series.name]} fill={color}></path>
      </svg>
    );
  };
  
  export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData} height={height}>
          <Series
            name="Noisy signal"
            valueField="value"
            argumentField="argument"
            type="line"
          />
          <Series
            name="Original signal"
            valueField="originalValue"
            argumentField="argument"
            type="line"
          />
          <Title
            text="Noisy and Original signals"
          >
            <Font size={32} weight={300} />
          </Title>
          <Legend markerRender={markerRender} />
        </Chart>
      </React.Fragment>
    );
}