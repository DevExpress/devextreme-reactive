export default () => {
    const [selectedPoints, setSelectedPoints] = useState([]);
  
    const onPointClick = useCallback(({ target: point }) => {
      const isPointSelected = point.isSelected();
  
      if (isPointSelected) {
        point.clearSelection();
        setSelectedPoints(points => points.filter(selectedPoint => selectedPoint !== point));
      }
      else {
        point.select();
        setSelectedPoints(selectedPoints => [...selectedPoints, point]);
      }
    }, []);
    
    return (
      <React.Fragment>
        <span>
          Total bars selected:
          {' '}
          {selectedPoints.length}
        </span>
        <Chart
          dataSource={chartData}
          onPointClick={onPointClick}
          pointSelectionMode='multiple'
        >
          <Series
            type="bar"
            valueField="population"
            argumentField="year"
          />
        </Chart>
      </React.Fragment>
    );
}