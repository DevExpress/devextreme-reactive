/* ... */

const CheckBoxContainer = (({
    shadePreviousCells, handleCheckboxChange,
  }) => (
    <StyledGrid item container direction="column" className={classes.checkBoxContainer} xs={6}>
      <ShadeCellsCheckBox
        shadePreviousCells={shadePreviousCells}
        handleChange={handleCheckboxChange}
      />
    </StyledGrid>
  ));
  
  export default () => {
    const [updateInterval, setUpdateInterval] = useState(10000);
    const [shadePreviousCells, setShadePreviousCells] = useState(true);
  
    const handleUpdateIntervalChange = useCallback((nextValue) => {
      setUpdateInterval(nextValue * 1000);
    }, [])
  
    const handleCheckboxChange = useCallback(() => {
      setShadePreviousCells(shadeCells => !shadeCells);
    }, []);
  
    return (
      <React.Fragment>
        <CheckBoxContainer
          shadePreviousCells={shadePreviousCells}
          handleCheckboxChange={handleCheckboxChange}
        />
        <UpdateIntervalBox
          updateInterval={updateInterval}
          onValueChange={handleUpdateIntervalChange}
        />
        <Scheduler
          dataSource={data}
          height={660}
          textExpr="title"
          defaultCurrentDate="2018-05-30"
          showCurrentTimeIndicator={true}
          shadeUntilCurrentTime={shadePreviousCells}
          indicatorUpdateInterval={updateInterval}
          
        >
          <View
            type="week"
            startDayHour={9}
            endDayHour={19}
          />
        </Scheduler>
      </React.Fragment>
    );
};