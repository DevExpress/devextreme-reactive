export default () => {
    return (
      <Scheduler
        dataSource={data}
        height={660}
        textExpr="title"
      >
        <View
          type="day"
          startDayHour={9}
          endDayHour={19}
        />
      </Scheduler>
    );
};