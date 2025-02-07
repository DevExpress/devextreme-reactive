const option = [2017, 2018, 2019];

export default () => {
  const [currentData, setCurrentData] = useState(data[2017]);
  const id = useRef(undefined);
  const index = useRef(1);
  const selectRef = useRef(null);

  useEffect(() => {
    id.current = setInterval(() => {
      selectRef.selectedIndex = index.current;
      setCurrentData(data[option[index.current]]);
  
      if (index.current === 2) {
        index.current = 0;
      } else {
        index.current += 1;
      }
    }, 4000);

    return () => clearTimeout(id.current);
  }, []);
  
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
      </Chart>
      <select
        ref={selectRef}
        style={{ width: '100px', margin: '10px' }}
        onChange={changeData}
      >
        <option>{ option[0] }</option>
        <option>{ option[1] }</option>
        <option>{ option[2] }</option>
      </select>
    </React.Fragment>
  );
}