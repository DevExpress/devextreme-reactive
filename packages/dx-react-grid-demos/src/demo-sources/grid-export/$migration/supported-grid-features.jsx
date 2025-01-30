/* usual imports */
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';

export default () => {
  const onExporting = useCallback(e => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
  }, []);

  const [defaultGroupsExpanded, setDefaultGroupsExpanded] = useState(false);
  const [defaultSelection] = useState([14, 30, 38]);

  const onContentReady = useCallback(e => {
    if(!defaultGroupsExpanded) {
      e.component.expandRow(['Todd Hoffman'])
        .then(() => e.component.expandRow(['Todd Hoffman', 'Denver']))
        .then(() => e.component.expandRow(['Todd Hoffman', 'Casper']));
      setDefaultGroupsExpanded(true);
    }
  }), [defaultGroupsExpanded]);  

  return (
    <DataGrid
      dataSource={orders}
      keyExpr="ID"
      width="100%"
      showBorders={true}
      onExporting={onExporting}
      defaultSelectedRowKeys={defaultSelection}
      onContentReady={onContentReady}
    >
      <Selection mode="multiple" />
      <GroupPanel visible={true} />
      <Grouping autoExpandAll={true} />

      <Column
        dataField="Employee"
        caption="Employee"
        groupIndex={0}
      />
      <Column
        dataField="OrderNumber"
        caption="Invoice Number"
      />
      <Column
        dataField="OrderDate"
        caption="Order Date"
        format="shortDate"
      />
      <Column
        dataField="CustomerStoreCity"
        caption="City"
        groupIndex={1}
      />
      <Column
        dataField="CustomerStoreState"
        caption="State"
      />
      <Column
        dataField="SaleAmount"
        caption="Sale Amount"
      />
      <Summary>
        <TotalItem
          column="OrderNumber"
          summaryType="count"
        />
        <TotalItem
          column="SalesAmount"
          summaryType="sum"
        />
        <GroupItem
          column="OrderNumber"
          summaryType="count"
          showInGroupFooter={true}
          alignByColumn={true}
        />
        <GroupItem
          column="SalesAmount"
          summaryType="max"
          showInGroupFooter={true}
          alignByColumn={true}
        />
      </Summary>
      <Export enabled={true} allowExportSelectedData={true} />
    </DataGrid>
  );
};