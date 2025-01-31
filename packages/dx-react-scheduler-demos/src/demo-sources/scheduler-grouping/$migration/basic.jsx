export default () => {
    const [groups] = useState(['roomId', 'members']);
  
    return (
      <React.Fragment>
        <Scheduler
          dataSource={data}
          height={660}
          textExpr="title"
          groups={groups}
          defaultCurrentDate="2017-05-28"
        >
          <View
            type="day"
            startDayHour={9}
            endDayHour={15}
          />
          <Resource
            dataSource={owners}
            fieldExpr={'members'}
            label={'Members'}
            allowMultiple={true}
            useColorAsDefault={true}
          />
          <Resource
            dataSource={locaions}
            fieldExpr={'roomId'}
            label={'Locations'}
          />
        </Scheduler>
      </React.Fragment>
    );
};