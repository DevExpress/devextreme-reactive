const getDateCellClassName = (isToday, isWeekend) => {
    if (isToday) {
      return 'dark-blue-background';
    }
    if (isWeekend) {
      return 'dark-gray-background';
    }
  };
  
  const DateCell = ({ isToday, isWeekend, date }) => {
    return (
      <div className={getDateCellClassName(isToday, isWeekend)}>
        <div className="data-cell-day-name">
          { date.toLocaleString(window.navigator.language, { weekday: 'short' }) }
        </div>
        <div className="data-cell-day-number">
          { date.getDate() }
        </div>
      </div>
    );
  };
  
  const getDataCellClassName = (isToday, isWeekend) => {
    if (isToday) {
      return 'blue-background';
    }
    if (isWeekend) {
      return 'gray-background';
    }
  };
  
  const DataCell = ({ isToday, isWeekend }) => {
    return (
      <div className={getDataCellClassName(isToday, isWeekend)} />
    );
  };
  
  const cellRender = (CellComponent, datePropName) => (props) => {
    const cellDate = props[datePropName];
    const date = new Date(cellDate);
  
    if (date.getDate() === new Date().getDate()) {
      return <CellComponent isToday={true} date={date} />;
    }
    
    if (date.getDay() === 0 || date.getDay() === 6) {
      return <CellComponent isWeekend={true} date={date} />;
    }
    
    return <CellComponent date={date}/>;
  };
  
  const views = ['week'];
  
  export default () => (
    <Scheduler
      dataSource={appointments}
      height={660}
      views={views}
      textExpr="title"
      startDayHour={9}
      endDayHour={19}
      dataCellRender={cellRender(DataCell, 'startDate')}
      dateCellRender={cellRender(DateCell, 'date')}
    />
);