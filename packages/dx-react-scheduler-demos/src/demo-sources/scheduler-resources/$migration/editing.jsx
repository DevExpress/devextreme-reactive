export default () => {
    return (
      <React.Fragment>
        <Scheduler
          dataSource={data}
          textExpr="title"
          defaultCurrentDate="2017-05-25"
        >
          <View
            type="month"
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