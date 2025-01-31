import Scheduler from 'devextreme-react/scheduler';

const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

const views = ['day'];

export default () => (
  <Scheduler
    dataSource={schedulerData}
    views={views}
    textExpr="title"
    defaultCurrentDate={currentDate}
    startDayHour={9}
    endDayHour={14}
  />
);