export default () => {
    const [currentView, setCurrentView] = useState('workWeek');
    
    return (
      <Scheduler
        dataSource={appointments}
        textExpr="title"
        defaultCurrentDate="2018-07-25"
        currentView={currentView}
        onCurrentViewChanged={setCurrentView}
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
        <View
          type="day"
        />
      </Scheduler>
    );
};