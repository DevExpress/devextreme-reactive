export default () => {
    const [mainResourceName, setMainResourceName] = useState(resources[0]);
    
    const changeMainResource = useCallback((mainResourceName) => {
      setMainResourceName(mainResourceName);
    }, []);
    
    return (
      <React.Fragment>
        <ResourceSwitcher
          resources={resources}
          mainResourceName={mainResourceName}
          onChange={changeMainResource}
        />
        <Scheduler
          dataSource={data}
          height={660}
          textExpr="title"
        >
          <View
            type="week"
            startDayHour={11.5}
            endDayHour={16}
          />
          {
            resources.map(resource => (
              <Resource
                dataSource={resource.instances}
                fieldExpr={resource.fieldName}
                label={resource.title}
                allowMultiple={resource.allowMultiple ?? false}
                useColorAsDefault={mainResourceName === resource.fieldName}
              />
            ))
          }
        </Scheduler>
      </React.Fragment>
    );
};