export default () => {
    return (
      <Scheduler
        dataSource={data}
        textExpr="title"
        defaultCurrentDate="2018-07-27"
        views={['month']}
      />
    );
};