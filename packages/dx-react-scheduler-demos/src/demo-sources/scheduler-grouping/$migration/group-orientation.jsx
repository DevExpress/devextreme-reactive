export default () => {
    const [priorityInstances] = useState([
      { text: 'Low Priority', id: 1, color: blue },
      { text: 'High Priority', id: 2, color: orange },
    ]);
  
    const [groups] = useState(['priorityId']);
  
    return (
      <React.Fragment>
        <Scheduler
          dataSource={data}
          height={660}
          textExpr="title"
          groups={groups}
          defaultCurrentDate="2018-05-30"
        >
          <View
            type="workWeek"
            name="Vertical Orientation"
            startDayHour={9}
            endDayHour={17}
            cellDuration={60}
            groupOrientation="vertical"
          />
          <View
            type="workWeek"
            name="Horizontal Orientation"
            startDayHour={9}
            endDayHour={17}
            groupOrientation="horizontal"
          />
          <Resource
            dataSource={priorityInstances}
            fieldExpr={'priorityId'}
            label={'Priority'}
          />
        </Scheduler>
      </React.Fragment>
    );
};