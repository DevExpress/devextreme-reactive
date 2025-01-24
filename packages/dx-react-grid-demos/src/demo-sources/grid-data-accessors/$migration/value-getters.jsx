import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

const dataSource = new DataSource({
  store: new ArrayStore({
    data: rows
  }),
  map: (dataItem) => ({
    firstName: dataItem.user?.firstName,
    lastName: dataItem.user?.lastName,
    car: dataItem.car?.model,
    position: dataItem.position,
    city: dataItem.city,
  })
});

export default () => {
  return (
    <div>
      <DataGrid
        dataSource={rows}
      >
        <Column
          dataField={'firstName'}
          caption={'First Name'}
        />
        <Column
          dataField={'lastName'}
          caption={'Last Name'}
        />
        <Column
          dataField={'car'}
          caption={'Car'}
        />
        <Column
          dataField={'position'}
          caption={'Position'}
        />
        <Column
          dataField={'city'}
          caption={'City'}
        />
      </DataGrid>
    </div>
  );
};