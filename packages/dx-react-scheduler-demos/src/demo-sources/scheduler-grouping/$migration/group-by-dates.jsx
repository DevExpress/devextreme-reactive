export default () => {
    const [groups] = useState(['priorityId']);
    const [groupByDate, setGroupByDate] = useState(true);
  
    const onGroupOrderChange = useCallback(() => {
      setGroupByDate(groupByDate => !groupByDate);
    }, []);
  
    return (
      <React.Fragment>
        <GroupOrderSwitcher isGroupByDate={groupByDate} onChange={onGroupOrderChange} />
        <Scheduler
          dataSource={data}
          height={660}
          textExpr="title"
          groups={groups}
          groupByDate={groupByDate}
          defaultCurrentDate="2018-05-30"
        >
          <View
            type="workWeek"
            startDayHour={8.5}
            endDayHour={17}
          />
          <View
            type="month"
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