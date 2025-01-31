const views = ['week'];

export default () => (
  <Scheduler
    dataSource={appointments}
    defaultCurrentDate={currentDate}
    allDayPanelMode='all'
    views={views}
    textExpr="title"
    startDayHour={9}
    endDayHour={19}
  />
);