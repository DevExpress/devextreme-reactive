export default () => {
    const [selectedPoints, setSelectedPoints] = useState([]);
    
    const clearSelection = useCallback((component) => {
      component.clearSelection();
      setSelectedPoints([]);
    }, []);
    
    const selectPoint = useCallback((point) => {
      point.select();
      setSelectedPoints(points => [...points, point]);
    }, []);
    
    const deselectPoint = useCallback((point) => {
      point.clearSelection();
      setSelectedPoints(points => points.filter(selectedPoint => selectedPoint !== point));
    }, []);
    
    const onPointClick = useCallback(({ target: point, event, component }) => {
      const isPointSelected = point.isSelected();
      const selectedPointsCount = selectedPoints.length;
      
      if (!event.ctrlKey && !event.metaKey) {
        clearSelection(component);
        if (!isPointSelected || selectedPointsCount > 1) {
          selectPoint(point);
        }
        return;
      }
  
      if (isPointSelected) {
        deselectPoint(point)
      }
      else {
        selectPoint(point)
      }
    }, [selectedPoints, clearSelection, selectPoint, deselectPoint]);
    
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