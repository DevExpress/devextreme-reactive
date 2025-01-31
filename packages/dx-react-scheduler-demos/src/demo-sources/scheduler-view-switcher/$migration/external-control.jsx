const ExternalViewSwitcher = ({
    currentView,
    onChange,
  }) => (
    <RadioGroup
      aria-label="Views"
      style={{ flexDirection: 'row' }}
      name="views"
      value={currentView}
      onChange={onChange}
    >
      <FormControlLabel value="week" control={<Radio />} label="Week" />
      <FormControlLabel value="workWeek" control={<Radio />} label="Work Week" />
      <FormControlLabel value="month" control={<Radio />} label="Month" />
    </RadioGroup>
  );
  
  export default () => {
    const [currentView, setCurrentView] = useState('month');
  
    const onOptionChanged = useCallback(e => {
      if (e.fullName === 'currentView') {
        setCurrentView(e.value);
      }
    }, []);
  
    return (
      <React.Fragment>
        <ExternalViewSwitcher
          currentView={currentView}
          onChange={setCurrentView}
        />
  
        <Scheduler
          dataSource={data}
          textExpr="title"
          defaultCurrentDate="2018-07-25"
          currentView={currentView}
          height={660}
        >
          <View
            type="week"
            startDayHour={10}
            endDayHour={19}
          />
          <View
            type="workWeek"
            startDayHour={9}
            endDayHour={19}
          />
          <View
            type="month"
          />
        </Scheduler>
      </React.Fragment>
    );
};