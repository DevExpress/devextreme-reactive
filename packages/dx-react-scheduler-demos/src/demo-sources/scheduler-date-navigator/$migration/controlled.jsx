export default () => {
    const [currentDate, setCurrentDate] = useState('2018-06-27');
    
    return (
      <Scheduler
        dataSource={data}
        textExpr="title"
        currentDate={currentDate}
        onCurrentDateChanged={setCurrentDate}
      >
        <View
          type="week"
          startDayHour={9}
          endDayHour={19}
        />
      </Scheduler>
    );
};