const views = ['day'];

export default () => (
  <Scheduler
    dataSource={appointments}
    views={views}
    textExpr="title"
    startDayHour={8}
    endDayHour={13}
  />
);