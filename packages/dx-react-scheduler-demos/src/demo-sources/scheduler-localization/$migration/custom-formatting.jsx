export default () => {
    const formatDayScaleDate = useCallback((date) => {
      const momentDate = moment(date);
      const weekday = momentDate.weekday();
      return momentDate.format(weekday === 6 || weekday === 0 ? 'D' : 'dddd');
    }, []);
  
    const dateCellRender = useCallback(({ date }) => {
      return (
        <div>
          <div className="data-cell-day-name">
            { formatDayScaleDate(date) }
          </div>
          <div className="data-cell-day-number">
            { date.getDate() }
          </div>
        </div>
      );
    }, []);
    
    const timeCellRender = useCallback(({ date }) => {
      return (
        <div className="time-cell">
          { formatTimeScaleDate(date) }
        </div>
      );
    }, []);
  
    return (
      <React.Fragment>
        <Scheduler
          dataSource={data}
          height={660}
          textExpr="title"
          defaultCurrentDate={currentDate}
          dateCellRender={dateCellRender}
          timeCellRender={timeCellRender}
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