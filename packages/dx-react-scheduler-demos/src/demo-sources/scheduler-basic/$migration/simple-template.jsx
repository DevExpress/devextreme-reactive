const views = ['week'];

const renderAppointment = ({ targetedAppointmentData }) => {
  return (
    <div style={{
      backgroundColor: '#FFC107',
      borderRadius: '8px',
    }}>
      <div>{targetedAppointmentData.text}</div>
      <div>
        {formatDate(targetedAppointmentData.displayStartDate, 'shortTime')}
        {' - '}
        {formatDate(targetedAppointmentData.displayEndDate, 'shortTime')}
      </div>
    </div>
  );
};

export default () => (
  <Scheduler
    dataSource={appointments}
    defaultCurrentDate={currentDate}
    views={views}
    textExpr="title"
    startDayHour={9}
    endDayHour={19}
    appointmentRender={renderAppointment}
  />
);