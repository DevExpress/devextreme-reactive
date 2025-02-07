export default () => {
    const onAppointmentFormOpening = useCallback(e => {
      let formItems = e.form.option("items");
      
      formItems.push({
          colSpan: 2,
          label: { text: "Custom Field" },
          editorType: "dxTextBox",
          dataField: "customField"
      });
      
      formItems = formItems.filter(item => item.label?.text !== 'More Information')
  
      e.form.option("items", formItems);
    }, []);
  
    return (
      <Scheduler
        dataSource={data}
        height={660}
        textExpr="title"
        defaultCurrentDate={currentDate}
        onAppointmentFormOpening={onAppointmentFormOpening}
      >
        <View
          type="day"
          startDayHour={9}
          endDayHour={15}
        />
      </Scheduler>
    );
};