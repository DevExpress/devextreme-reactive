const views = ['week'];

export default () => (
  <Scheduler
    dataSource={appointments}
    height={660}
    views={views}
    textExpr="title"
    startDayHour={9}
    endDayHour={19}
  />
);