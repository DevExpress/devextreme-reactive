const views = ['month'];
const currentDate = '2018-07-17';

export default () => (
  <Scheduler
    dataSource={appointments}
    views={views}
    currentDate={currentDate}
    textExpr="title"
  />
);