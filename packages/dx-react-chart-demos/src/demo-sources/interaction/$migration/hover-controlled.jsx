export default () => {
    const [hoveredSeries, setHoveredSeries] = useState(undefined);
    const [hoveredPoint, setHoveredPoint] = useState(undefined);
  
    const onSeriesHoverChanged = useCallback(({ target: series }) => {
      setHoveredSeries(series.isHovered() ? series: null);
    }, []);
    
    const onPointHoverChanged = useCallback(({ target: point }) => {
      setHoveredSeries(point.isHovered() ? point: null);
    }, []);
    
    return (
      <React.Fragment>
        <Chart
          dataSource={chartData}
          onSeriesHoverChanged={onSeriesHoverChanged}
          onPointHoverChanged={onPointHoverChanged}
        >
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