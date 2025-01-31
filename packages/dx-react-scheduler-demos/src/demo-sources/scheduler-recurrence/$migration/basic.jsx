const views = ['week', 'month'];

export default () => (
  <Scheduler
    dataSource={data}
    defaultCurrentDate={'2018-06-25'}
    views={views}
    textExpr="title"
    startDayHour={9}
    endDayHour={15}
    recurrenceRuleExpr="rRule"
    recurrenceExceptionExpr="exDate"
  >
    <Editing
      allowAdding={false}
      allowDeleting={false}
      allowResizing={true}
      allowDragging={true}
      allowUpdating={true}
    />
  </Scheduler>
);