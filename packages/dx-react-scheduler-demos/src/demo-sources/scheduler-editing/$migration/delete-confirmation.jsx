export default () => {
    const onAppointmentEditing = useCallback((e) => {
      if(!window.confirm('Are you sure you want to edit/delete this appointment?')) {
        e.cancel = true;
      }
    }, []);
  
    return (
      <Scheduler
        dataSource={data}
        height={660}
        textExpr="title"
        defaultCurrentDate={currentDate}
        onAppointmentUpdating={onAppointmentEditing}
        onAppointmentDeleting={onAppointmentEditing}
      >
        <View
          type="day"
          startDayHour={9}
          endDayHour={17}
        />
      </Scheduler>
    );
};