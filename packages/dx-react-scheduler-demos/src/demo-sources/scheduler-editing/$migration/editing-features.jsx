export default () => {
    const [editingOptions, setEditingOptions] = useState({
      allowAdding: true,
      allowDeleting: true,
      allowUpdating: true,
      allowDragging: true,
      allowResizing: true,
    });
    
    const handleEditingOptionsChange = useCallback(({ target }) => {
      const { value } = target;
      const { [value]: checked } = editingOptions;
      setEditingOptions({
        ...editingOptions,
        [value]: !checked,
      });
    });
    
    const {
      allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
    } = editingOptions;
    
    return (
      <React.Fragment>
        <EditingOptionsSelector
          options={editingOptions}
          onOptionsChange={handleEditingOptionsChange}
        />
        <Scheduler
          dataSource={data}
          height={660}
          textExpr="title"
          defaultCurrentDate={currentDate}
          onAppointmentUpdating={onAppointmentEditing}
          onAppointmentDeleting={onAppointmentEditing}
        >
          <Editing
            allowAdding={allowAdding}
            allowDeleting={allowDeleting}
            allowResizing={allowResizing}
            allowDragging={allowDragging}
            allowUpdating={allowUpdating}
          />
          <View
            type="week"
            startDayHour={9}
            endDayHour={19}
          />
        </Scheduler>
      </React.Fragment>
    );
};