export default () => {
    const [zoomAndPanOptions, setZoomAndPanOptions] = useState({
      zoomArgument: true,
      panArgument: true,
      zoomValue: false,
      panValue: false,
    });
    
    const submit = useCallback(({ target }) => setZoomAndPanOptions(options => ({
      ...options,
      [target.id]: target.checked,
    })), []);
  
    const renderInput = useCallback((id, label) => {
      const { [id]: checked } = zoomAndPanOptions;
      return (
        <div className="custom-control custom-checkbox m-3">
          <input type="checkbox" className="custom-control-input" id={id} checked={checked} onChange={submit} />
          <label className="custom-control-label" htmlFor={id}>{label}</label>
        </div>
      );
    }, [zoomAndPanOptions, submit]);
  
    return (
      <React.Fragment>
        <Chart
          dataSource={chartData}
        >
          <Series
            type="line"
            valueField="y"
            argumentField="x"
          />
          <ZoomAndPan
            argumentAxis={getMode(zoomArgument, panArgument)}
            valueAxis={getMode(zoomValue, panValue)}
          />
        </Chart>
        <div style={inputsContainerStyle}>
          {renderInput('zoomArgument', 'Zoom argument')}
          {renderInput('panArgument', 'Pan argument')}
          {renderInput('zoomValue', 'Zoom value')}
          {renderInput('panValue', 'Pan value')}
        </div>
      </React.Fragment>
    );
}