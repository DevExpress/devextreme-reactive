export default () => {
    return (
      <TreeList
        dataSource={data}
        showRowLines={true}
        showBorders={true}
        columnAutoWidth={true}
        itemsExpr="items"
        dataStructure="tree"
      >
        <Column
          dataField={'name'}
          caption={'Name'}
          width={300}
        />
        <Column
          dataField={'gender'}
          caption={'Gender'}
        />
        <Column
          dataField={'city'}
          caption={'City'}
        />
        <Column
          dataField={'car'}
          caption={'Car'}
        />
      </TreeList>
    );
};