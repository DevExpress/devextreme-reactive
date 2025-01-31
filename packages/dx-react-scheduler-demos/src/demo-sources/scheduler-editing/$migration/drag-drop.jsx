const dragDisableIds = new Set([3, 8, 10, 12]);

export default () => {
  const onDragStart = useCallback(e => {
    if (dragDisableIds.has(e.itemData.id)) {
      e.cancel = true;
    }
  }, []);

  return (
    <Scheduler
      dataSource={data}
      height={660}
      textExpr="title"
      defaultCurrentDate={currentDate}
    >
      <AppointmentDragging onDragStart={onDragStart} />
      <View
        type="week"
        startDayHour={9}
        endDayHour={16}
      />
    </Scheduler>
  );
};