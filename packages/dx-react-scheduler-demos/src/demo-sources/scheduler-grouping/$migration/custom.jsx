const colors = ['rgba(102, 187, 106, 0.1)', 'rgba(255, 167, 38, 0.15)'];
const iconClasses = ['low-priority-icon', 'high-priority-icon'];

export default () => {
  const dataCellRender = useCallback(({ groupIndex, text }) => {
    return (
      <div style={{ backgroundColor: colors[groupIndex] }}>
        { text }
      </div>
    );
  }, []);
  
  const dateCellRender = useCallback(({ groupIndex, date }) => {
    return (
      <div style={{ backgroundColor: colors[groupIndex] }}>
        <div className="data-cell-day-name">
          { date.toLocaleString(window.navigator.language, { weekday: 'short' }) }
        </div>
        <div className="data-cell-day-number">
          { date.getDate() }
        </div>
      </div>
    );
  }, []);

  const resourceCellRender = useCallback(({ id, text }) => {
    const Icon = getIconById(id);

    return (
      <div style={{ backgroundColor: colors[id] }}>
        <span>{ text }</span>
        <Icon />
      </div>
    );
  }, []);
  
  const [groups] = useState(['priorityId']);
  const [data] = useState(appointments.filter(appointment => appointment.priorityId < 3));
 
  return (
    <React.Fragment>
      <Scheduler
        dataSource={data}
        height={660}
        textExpr="title"
        groups={groups}
        defaultCurrentDate="2018-05-30"
        dataCellRender={dataCellRender}
        dateCellRender={dateCellRender}
        resourceCellRender={resourceCellRender}
      >
        <View
          type="day"
          startDayHour={9}
          endDayHour={17}
        />
        <Resource
          dataSource={priorityData}
          fieldExpr={'priorityId'}
          label={'Priority'}
        />
      </Scheduler>
    </React.Fragment>
  );
};