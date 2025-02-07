export default () => {
    const [tooltipTarget, setTooltipTarget] = useState(undefined);
  
    const onPointHoverChanged = useCallback(({ target: point, component }) => {
      setTooltipTarget(point);
      
      if (point) {
        point.showTooltip();
      } else {
        component.hideTooltip();
      }
    }, []);
    
    return (
      <React.Fragment>
        <Chart
          dataSource={chartData}
          onPointHoverChanged={onPointHoverChanged} 
        >
          <Series
            type="bar"
            valueField="population"
            argumentField="year"
          />
          <Tooltip
            enabled={false}
          />
        </Chart>
      </React.Fragment>
    );
}