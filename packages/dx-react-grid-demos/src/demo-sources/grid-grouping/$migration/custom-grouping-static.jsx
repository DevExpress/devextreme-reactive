import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

const dataSource = new DataSource({
  store: new ArrayStore({
    data
  }),
  postProcess: (hierarchicalData) => {
    const flatData = hierarchicalData.reduce((acc, value) => {
      const items = value.items.map((item) => ({
        ...item,
        'gender': value.key,
      }));

      return [
        ...acc,
        ...items,
      ];
    }, []);
    
    return flatData;
  }
});

export default () => {
  return (
    <div>
      <DataGrid
        dataSource={dataSource}
      >
        <Column
          dataField={'name'}
          caption={'Name'}
        />
        <Column
          dataField={'gender'}
          caption={'Gender'}
          groupIndex={0}
        />
        <Column
          dataField={'city'}
          caption={'City'}
        />
        <Column
          dataField={'car'}
          caption={'Car'}
        />
      </DataGrid>
    </div>
  );
};