export default () => {
    const [selectedPoint, setSelectedPoint] = useState(undefined);
  
    const onPointClick = useCallback(({ target: point, component }) => {
      if (point.isSelected()) {
        component.clearSelection();
        setSelectedPoint(undefined);
      }
      else {
        point.select();
        setSelectedPoint(point);
      }
    }, []);
    
    return (
      <React.Fragment>
        <span>
          Selected value:
          {' '}
          {selectedPoint ? data[selectedPoint].population : undefined}
        </span>
        <Chart
          dataSource={chartData}
          onPointClick={onPointClick}
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