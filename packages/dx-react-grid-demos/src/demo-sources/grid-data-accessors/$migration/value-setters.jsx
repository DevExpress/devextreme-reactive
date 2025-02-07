export default () => {
    const calculateFirstName = useCallback(row => (row.user ? row.user.firstName : undefined), []);
    const calculateLastName = useCallback(row => (row.user ? row.user.lastName : undefined), []);
    const calculateCarModel = useCallback(row => (row.car ? row.car.model : undefined), []);
  
    const setFirstName = useCallback((newData, value, currentRowData) => {
      newData.user = {
        ...currentRowData.user,
        firstName: value
      };
    }, []);
    const setLastName = useCallback((newData, value, currentRowData) => {
      newData.user = {
        ...currentRowData.user,
        lastName: value
      };
    }, []);
    const setCarModel = useCallback((newData, value, currentRowData) => {
      newData.car = {
        model: value
      };
    }, []);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Editing
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
          />
          <Column
            name={'firstName'}
            caption={'First Name'}
            calculateCellValue={calculateFirstName}
            setCellValue={setFirstName}
          />
          <Column
            name={'lastName'}
            caption={'Last Name'}
            calculateCellValue={calculateLastName}
            setCellValue={setLastName}
          />
          <Column
            name={'car'}
            caption={'Car'}
            calculateCellValue={calculateCarModel}
            setCellValue={setCarModel}
          />
          <Column
            name={'position'}
            caption={'Position'}
          />
          <Column
            name={'city'}
            caption={'City'}
          />
        </DataGrid>
      </div>
    );
};