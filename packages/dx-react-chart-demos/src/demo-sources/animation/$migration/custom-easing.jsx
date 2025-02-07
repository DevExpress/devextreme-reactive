export default () => {
    const [currentData, setCurrentData] = useState(data[2017]);
    
    const changeData = useCallback(e => {
      setCurrentData(data[e.target.value]);
    };
  
    return (
      <React.Fragment>
        <Chart dataSource={currentData}>
          <ValueAxis
            name="total"
          />
          <ValueAxis
            name="sale"
            position="right"
          >
            <Label format="currency" />
          </ValueAxis>
          <CommonSeriesSettings
            argumentField="month"
          />
          <Series
            name="Units Sold"
            valueField="sale"
            type="bar"
            axis="sale"
          />
          <Series
            name="Total Transactions"
            valueField="total"
            type="spline"
            axis="total"
          />
          <Animation
            duration={2000}
            easing='easeOutCubic'
          />
        </Chart>
        <select
          style={{ width: '100px', margin: '10px' }}
          onChange={changeData}
        >
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
        </select>
      </React.Fragment>
    );
}