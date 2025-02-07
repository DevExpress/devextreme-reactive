export default () => {
    const shouldCopy = useRef(false);
   
    const onDragEnd = useCallback(({ itemData, toItemData, event }) => {
      shouldCopy.current = event.shiftKey && (itemData.startDate !== toItemData.startDate || itemData.endDate !== toItemData.endDate);
    }, [shouldCopy.current]);
  
    const onAppointmentUpdating = useCallback((e) => {
      if (shouldCopy.current) {
        e.cancel = true;
        shouldCopy.current = false;
        e.component.addAppointment(e.newData);
      }
    }, []);
  
    return (
      <Scheduler
        dataSource={data}
        height={660}
        textExpr="title"
        defaultCurrentDate={currentDate}
        onAppointmentUpdating={onAppointmentUpdating}
      >
        <AppointmentDragging onDragEnd={onDragEnd} />
        <View
          type="week"
          startDayHour={9}
          endDayHour={17}
        />
      </Scheduler>
    );
};