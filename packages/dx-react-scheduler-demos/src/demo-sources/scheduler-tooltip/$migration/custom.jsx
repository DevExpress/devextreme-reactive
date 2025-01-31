/* Lots of code here */

const renderAppointmentTooltip = ({ appointmentData }) => {
    return (
      <React.Fragment>
        <div>
          <Header data={appointmentData} commandButtonComponent={CommandButton} />
        </div>
        <div>
          <Content data={appointmentData} />
        </div>
      </React.Fragment>
    );
  };
  
  export default () => {
    return (
      <Scheduler
        dataSource={data}
        height={660}
        textExpr="title"
        appointmentTooltipRender={renderAppointmentTooltip}
      >
        <View
          type="week"
          startDayHour={9}
          endDayHour={19}
        />
      </Scheduler>
    );
};