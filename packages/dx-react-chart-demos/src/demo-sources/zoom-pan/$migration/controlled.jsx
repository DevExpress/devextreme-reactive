export default () => {
    const [argumentVisualRange, setArgumentVisualRange] = useState([null, null]);
    const [valueVisualRange, setValueVisualRange] = useState([null, null]);
  
    const onZoomEnd = useCallback(({ axis, range }) => {
      if (axis.isArgumentAxis) {
        setArgumentVisualRange(range);
      }
      else {
        setValueVisualRange(range);
      }
    }, []);
  
    return (
      <React.Fragment>
        <Chart
          dataSource={chartData}
          onZoomEnd={onZoomEnd}
        >
          <ArgumentAxis>
            <VisualRange
              startValue={argumentVisualRange[0]}
              endValue={argumentVisualRange[1]}
            />
          </ArgumentAxis>
          <ValueAxis>
            <VisualRange
              startValue={valueVisualRange[0]}
              endValue={valueVisualRange[1]}
            />
          </ValueAxis>
          <Series
            type="line"
            valueField="y"
            argumentField="x"
          />
          <ZoomAndPan
            argumentAxis="both"
            valueAxis="both"
          />
        </Chart>
      </React.Fragment>
    );
}