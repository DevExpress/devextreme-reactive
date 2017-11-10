<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.14...v1.0.0-beta.1) (2017-11-10)


### Bug Fixes

* **react-grid:** cancel find of nested groups within an empty childRows array ([#460](https://github.com/DevExpress/devextreme-reactive/issues/460)) ([c1c3982](https://github.com/DevExpress/devextreme-reactive/commit/c1c3982))
* **react-grid:** correct focus behavior when switching to row edit mode ([#455](https://github.com/DevExpress/devextreme-reactive/issues/455)) ([aceada7](https://github.com/DevExpress/devextreme-reactive/commit/aceada7))
* **react-grid:** repair group rows keys ([#456](https://github.com/DevExpress/devextreme-reactive/issues/456)) ([f3021b9](https://github.com/DevExpress/devextreme-reactive/commit/f3021b9))
* **react-grid-bootstrap3:** adjust vertical align of controls inside cells ([#466](https://github.com/DevExpress/devextreme-reactive/issues/466)) ([d982f31](https://github.com/DevExpress/devextreme-reactive/commit/d982f31))
* **react-grid-material-ui:** normalize checkboxes size ([#450](https://github.com/DevExpress/devextreme-reactive/issues/450)) ([10b61d9](https://github.com/DevExpress/devextreme-reactive/commit/10b61d9))
* **react-grid-material-ui:** normalize heights of rows with checkboxes ([#445](https://github.com/DevExpress/devextreme-reactive/issues/445)) ([123ed27](https://github.com/DevExpress/devextreme-reactive/commit/123ed27))


### Code Refactoring

* **react-grid:** export TableColumnResizing from theme packages ([#438](https://github.com/DevExpress/devextreme-reactive/issues/438)) ([4be4ebf](https://github.com/DevExpress/devextreme-reactive/commit/4be4ebf))
* **rect-grid:** refactor table column reordering ([#424](https://github.com/DevExpress/devextreme-reactive/issues/424)) ([dc28366](https://github.com/DevExpress/devextreme-reactive/commit/dc28366)), closes [#154](https://github.com/DevExpress/devextreme-reactive/issues/154)


### Features

* **react-grid:** add localization messages ([#385](https://github.com/DevExpress/devextreme-reactive/issues/385)) ([c7581bd](https://github.com/DevExpress/devextreme-reactive/commit/c7581bd))
* **react-grid:** add the capability to filter/sort grouped rows ([#443](https://github.com/DevExpress/devextreme-reactive/issues/443)) ([292d429](https://github.com/DevExpress/devextreme-reactive/commit/292d429))
* **react-grid:** allow to change sorting of the grouped columns by keyboard ([#461](https://github.com/DevExpress/devextreme-reactive/issues/461)) ([e50c973](https://github.com/DevExpress/devextreme-reactive/commit/e50c973))
* **react-grid:** allow to focus each column and change sorting ([#448](https://github.com/DevExpress/devextreme-reactive/issues/448)) ([0550848](https://github.com/DevExpress/devextreme-reactive/commit/0550848))
* **react-grid:** rework virtual table ([#454](https://github.com/DevExpress/devextreme-reactive/issues/454)) ([b28e365](https://github.com/DevExpress/devextreme-reactive/commit/b28e365)), closes [#33](https://github.com/DevExpress/devextreme-reactive/issues/33) [#280](https://github.com/DevExpress/devextreme-reactive/issues/280) [#401](https://github.com/DevExpress/devextreme-reactive/issues/401)
* **react-grid:** support expanding/collapsing detail rows with keyboard ([#446](https://github.com/DevExpress/devextreme-reactive/issues/446)) ([47ab49d](https://github.com/DevExpress/devextreme-reactive/commit/47ab49d))
* **react-grid:** support expanding/collapsing group rows with keyboard ([#439](https://github.com/DevExpress/devextreme-reactive/issues/439)) ([4176d9a](https://github.com/DevExpress/devextreme-reactive/commit/4176d9a))


### BREAKING CHANGES

* **rect-grid:** The `ColumnOrderState` plugin has been renamed to `TableColumnReordering` and is now available via the `@devexpress/dx-react-grid-bootstrap3` and `@devexpress/dx-react-grid-material-ui` packages.

  The `TableView` plugin's `allowColumnReordering` property has been removed and the `TableColumnReordering` plugin now depends on the `TableView` plugin. Thus, it is enough to link the `TableColumnReordering` plugin below the `TableView` plugin to enable column reordering.

  Before:
  ```jsx
  import {
    // ...
    ColumnOrderState
  } from '@devexpress/dx-react-grid';

  // ...

  <ColumnOrderState defaultOrder={[/* ... */]} />
  <TableView allowColumnReordering />
  ```

  After:
  ```jsx
  import {
    // ...
    TableColumnReordering
  } from '@devexpress/dx-react-grid-bootstrap3';
  // } from '@devexpress/dx-react-grid-material-ui';

  // ...

  <TableView />
  <TableColumnReordering defaultOrder={[/* ... */]} />
  ```
* **react-grid:** The TableColumnResizing plugin is now available in the "@devexpress/dx-react-grid-bootstrap3" and "@devexpress/dx-react-grid-material-ui" packages.

  Use the following code to import the plugin.

  ```
  import {
    TableColumnResizing,
  } from from '@devexpress/dx-react-grid-bootstrap3'/* or '@devexpress/dx-react-grid-material-ui' */;
  ```



<a name="1.0.0-alpha.14"></a>
# [1.0.0-alpha.14](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2017-10-25)


### Bug Fixes

* **react-grid:** remove header cell title offset if grouping by click isn't allowed ([#434](https://github.com/DevExpress/devextreme-reactive/issues/434)) ([60285d4](https://github.com/DevExpress/devextreme-reactive/commit/60285d4)), closes [#432](https://github.com/DevExpress/devextreme-reactive/issues/432)
* **react-grid-bootstrap3:** do not allow to focus column chooser item checkbox ([728ea23](https://github.com/DevExpress/devextreme-reactive/commit/728ea23))


### Features

* **react-grid:** support custom grouping processing ([#395](https://github.com/DevExpress/devextreme-reactive/issues/395)) ([4fb92d0](https://github.com/DevExpress/devextreme-reactive/commit/4fb92d0))



<a name="1.0.0-alpha.13"></a>
# [1.0.0-alpha.13](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2017-10-19)


### Bug Fixes

* **react-grid:** remove a redundant SelectionState dependency on LocalGrouping ([#429](https://github.com/DevExpress/devextreme-reactive/issues/429)) ([50ee891](https://github.com/DevExpress/devextreme-reactive/commit/50ee891)), closes [#428](https://github.com/DevExpress/devextreme-reactive/issues/428)



<a name="1.0.0-alpha.12"></a>
# [1.0.0-alpha.12](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2017-10-19)


### Bug Fixes

* **react-grid:** add 'overflow: hidden' for MUI TableCell ([#406](https://github.com/DevExpress/devextreme-reactive/issues/406)) ([69fd88c](https://github.com/DevExpress/devextreme-reactive/commit/69fd88c)), closes [#403](https://github.com/DevExpress/devextreme-reactive/issues/403)
* **react-grid:** allow to use Grid with react@16 ([#389](https://github.com/DevExpress/devextreme-reactive/issues/389)) ([9f292fe](https://github.com/DevExpress/devextreme-reactive/commit/9f292fe))
* **react-grid:** correlate sorting order with grouping order ([#414](https://github.com/DevExpress/devextreme-reactive/issues/414)) ([db3377c](https://github.com/DevExpress/devextreme-reactive/commit/db3377c)), closes [#398](https://github.com/DevExpress/devextreme-reactive/issues/398)
* **react-grid:** optimize table selection rendering ([#412](https://github.com/DevExpress/devextreme-reactive/issues/412)) ([b0dfae1](https://github.com/DevExpress/devextreme-reactive/commit/b0dfae1)), closes [#397](https://github.com/DevExpress/devextreme-reactive/issues/397)
* **react-grid-bootstrap3:** fix server side rendering issue with VirtualTable ([#420](https://github.com/DevExpress/devextreme-reactive/issues/420)) ([207e81b](https://github.com/DevExpress/devextreme-reactive/commit/207e81b)), closes [#415](https://github.com/DevExpress/devextreme-reactive/issues/415)


### Features

* **react-grid:** implement column chooser ([#366](https://github.com/DevExpress/devextreme-reactive/issues/366)) ([74b99c1](https://github.com/DevExpress/devextreme-reactive/commit/74b99c1))


### Performance Improvements

* **react-core:** batch updates on draggable events ([#384](https://github.com/DevExpress/devextreme-reactive/issues/384)) ([51efef1](https://github.com/DevExpress/devextreme-reactive/commit/51efef1))


### BREAKING CHANGES

* **react-grid:** The `scope` parameter of the `setColumnSorting` action has been removed.

  The `GroupingState` plugin now has an optional dependency on the `SortingState` plugin. So, `GroupingState` should be placed after `SortingState`.

  Before:

  ```jsx
  <GroupingState /* ... */ />
  <SortingState /* ... */ />
  ```

  After:

  ```jsx
  <SortingState /* ... */ />
  <GroupingState /* ... */ />
  ```



<a name="1.0.0-alpha.11"></a>
# [1.0.0-alpha.11](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2017-10-04)


### Bug Fixes

* **react-core:** update TemplatePlacholder on placeholder func change ([#370](https://github.com/DevExpress/devextreme-reactive/issues/370)) ([69659c8](https://github.com/DevExpress/devextreme-reactive/commit/69659c8))
* **react-grid:** add 'pointer' cursor on group icon in the HeaderCell ([#369](https://github.com/DevExpress/devextreme-reactive/issues/369)) ([8d1de4a](https://github.com/DevExpress/devextreme-reactive/commit/8d1de4a))


### Code Refactoring

* **react-grid:** change custom filtering function signature ([#354](https://github.com/DevExpress/devextreme-reactive/issues/354)) ([67cfdc9](https://github.com/DevExpress/devextreme-reactive/commit/67cfdc9))
* **react-grid:** rename getCellData to getCellValue ([#349](https://github.com/DevExpress/devextreme-reactive/issues/349)) ([8f8e41d](https://github.com/DevExpress/devextreme-reactive/commit/8f8e41d))


### Features

* **react-grid:** add custom grouping functions to LocalGrouping ([#376](https://github.com/DevExpress/devextreme-reactive/issues/376)) ([2c31af1](https://github.com/DevExpress/devextreme-reactive/commit/2c31af1))
* **react-grid:** add the functionality to define a custom sorting algorithm ([#371](https://github.com/DevExpress/devextreme-reactive/issues/371)) ([4ac8ab8](https://github.com/DevExpress/devextreme-reactive/commit/4ac8ab8))
* **react-grid:** support column data types ([#336](https://github.com/DevExpress/devextreme-reactive/issues/336)) ([1528800](https://github.com/DevExpress/devextreme-reactive/commit/1528800))


### Performance Improvements

* **react-grid:** optimize internal state calculation ([#356](https://github.com/DevExpress/devextreme-reactive/issues/356)) ([be890b4](https://github.com/DevExpress/devextreme-reactive/commit/be890b4))
* **react-grid:** suppress redundant render ([#355](https://github.com/DevExpress/devextreme-reactive/issues/355)) ([695aacd](https://github.com/DevExpress/devextreme-reactive/commit/695aacd))


### BREAKING CHANGES

* **react-grid:** The `filterFn` property of the `LocalFiltering` has been renamed to `getColumnPredicate`. The argument list has been changed from `filterFn(row: Row, filter: Filter) => boolean` to  `getColumnPredicate(columnName: string) => Function`.  The returning function has the following signature `(value: any, filter, row: Row) => boolean`.
* **react-grid:** The `getCellData` property of the TableView plugin and the `getCellData` field of the Column interface have been renamed to `getCellValue`.



<a name="1.0.0-alpha.10"></a>
# [1.0.0-alpha.10](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2017-09-18)


### Bug Fixes

* **react-core:** use correct params within template chain ([#322](https://github.com/DevExpress/devextreme-reactive/issues/322)) ([64a9991](https://github.com/DevExpress/devextreme-reactive/commit/64a9991))


### Code Refactoring

* **react-core:** remove embedded Template connection ([#331](https://github.com/DevExpress/devextreme-reactive/issues/331)) ([f90955d](https://github.com/DevExpress/devextreme-reactive/commit/f90955d))
* **react-grid:** rename tableTemplate to tableLayoutTemplate ([#310](https://github.com/DevExpress/devextreme-reactive/issues/310)) ([def4a97](https://github.com/DevExpress/devextreme-reactive/commit/def4a97))


### Features

* **react-core:** implement TemplateConnector ([#314](https://github.com/DevExpress/devextreme-reactive/issues/314)) ([1e9bcfc](https://github.com/DevExpress/devextreme-reactive/commit/1e9bcfc))
* **react-grid:** add tableRowTemplate to the TableView plugin ([#317](https://github.com/DevExpress/devextreme-reactive/issues/317)) ([24d9446](https://github.com/DevExpress/devextreme-reactive/commit/24d9446))
* **react-grid:** implement row templates ([#333](https://github.com/DevExpress/devextreme-reactive/issues/333)) ([bc960d4](https://github.com/DevExpress/devextreme-reactive/commit/bc960d4))
* **react-grid:** implement table column resizing ([#297](https://github.com/DevExpress/devextreme-reactive/issues/297)) ([a377d3c](https://github.com/DevExpress/devextreme-reactive/commit/a377d3c))
* **react-grid:** make grouped and ungrouped column sorting independent ([#292](https://github.com/DevExpress/devextreme-reactive/issues/292)) ([c812fa3](https://github.com/DevExpress/devextreme-reactive/commit/c812fa3))


### BREAKING CHANGES

* **react-grid:** The `tableExtraProps` getter was removed from the `TableView` and `TableSelection` plugins.
* **react-core:** `connectGetters` and `connectActions` properties have been removed from the Template component. From now on, you can connect Getters and Actions using the TemplateConnector component.

Before:

```jsx
<Template name="templateName"
  connectGetters={getter => ({ value: getter('value') })}
  connectActions={action => ({ changeValue: action('changeValue') })}
>
  {({ value, changeValue }) => /* ... */}
</Template>
```

After:

```jsx
<Template name="templateName">
  <TemplateConnector>
    {({ value }, { changeValue }) =>  /* ... */}
  </TemplateConnector>
</Template>
```
* **react-grid:** The `tableTemplate` property has been renamed to `tableLayoutTemplate` to make the `TableView` plugin API more eloquent.



<a name="1.0.0-alpha.9"></a>
# [1.0.0-alpha.9](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2017-09-04)


### Bug Fixes

* **react-grid:** display a correct message in an empty grouping panel ([#274](https://github.com/DevExpress/devextreme-reactive/issues/274)) ([46b5291](https://github.com/DevExpress/devextreme-reactive/commit/46b5291))
* **react-grid:** fix the editing state mutation ([#279](https://github.com/DevExpress/devextreme-reactive/issues/279)) ([a120730](https://github.com/DevExpress/devextreme-reactive/commit/a120730))
* **react-grid:** update MUI to the 1.0.0-beta.6 version ([#275](https://github.com/DevExpress/devextreme-reactive/issues/275)) ([9032c34](https://github.com/DevExpress/devextreme-reactive/commit/9032c34)), closes [#271](https://github.com/DevExpress/devextreme-reactive/issues/271)
* **react-grid:** update MUI to the 1.0.0-beta.7 version ([#296](https://github.com/DevExpress/devextreme-reactive/issues/296)) ([7d7d649](https://github.com/DevExpress/devextreme-reactive/commit/7d7d649))



<a name="1.0.0-alpha.8"></a>
# [1.0.0-alpha.8](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2017-08-21)


### Bug Fixes

* **react-grid:** correct pager rendering within an empty grid ([#251](https://github.com/DevExpress/devextreme-reactive/issues/251)) ([eb13a8b](https://github.com/DevExpress/devextreme-reactive/commit/eb13a8b))
* **react-grid:** get rid of the exception thrown on a column ungrouping by drag and drop ([#260](https://github.com/DevExpress/devextreme-reactive/issues/260)) ([8fc2990](https://github.com/DevExpress/devextreme-reactive/commit/8fc2990))
* **react-grid:** preserve group panel height when no grouping is specified ([#261](https://github.com/DevExpress/devextreme-reactive/issues/261)) ([9116e92](https://github.com/DevExpress/devextreme-reactive/commit/9116e92))


### Code Refactoring

* **react-grid:** change TableRow and TableColumn interfaces structure ([#227](https://github.com/DevExpress/devextreme-reactive/issues/227)) ([5288a9f](https://github.com/DevExpress/devextreme-reactive/commit/5288a9f))
* **react-grid:** merge the setRowSelection and setRowsSelection actions ([#233](https://github.com/DevExpress/devextreme-reactive/issues/233)) ([876a2c6](https://github.com/DevExpress/devextreme-reactive/commit/876a2c6))
* **react-grid:** remove redundant getters from GroupingState ([#244](https://github.com/DevExpress/devextreme-reactive/issues/244)) ([1fb21ca](https://github.com/DevExpress/devextreme-reactive/commit/1fb21ca))
* **react-grid:** rename colspan to colSpan ([#248](https://github.com/DevExpress/devextreme-reactive/issues/248)) ([afc69e9](https://github.com/DevExpress/devextreme-reactive/commit/afc69e9))
* **react-grid:** wrap group panel column data ([#267](https://github.com/DevExpress/devextreme-reactive/issues/267)) ([156392b](https://github.com/DevExpress/devextreme-reactive/commit/156392b))


### Features

* **react-core:** rework Getter ([#259](https://github.com/DevExpress/devextreme-reactive/issues/259)) ([4fd5f9b](https://github.com/DevExpress/devextreme-reactive/commit/4fd5f9b))
* **react-grid:** adopt PluginContainer dependencies in Grid plugins ([#249](https://github.com/DevExpress/devextreme-reactive/issues/249)) ([016f618](https://github.com/DevExpress/devextreme-reactive/commit/016f618))
* **react-grid:** provide the custom data accessors capability ([#264](https://github.com/DevExpress/devextreme-reactive/issues/264)) ([5f699bf](https://github.com/DevExpress/devextreme-reactive/commit/5f699bf)), closes [#176](https://github.com/DevExpress/devextreme-reactive/issues/176)


### Performance Improvements

* **react-grid:** optimize plugin dependencies check ([#253](https://github.com/DevExpress/devextreme-reactive/issues/253)) ([640c124](https://github.com/DevExpress/devextreme-reactive/commit/640c124))


### BREAKING CHANGES

* **react-grid:**
The following changes have been made in the GroupingPanel plugin:
  - the `groupPanelCellTemplate` property has been renamed to `groupPanelItemTemplate`;
  - the `groupedColumns` property has been renamed to `groupingPanelItems` and now contains an array of objects which conform the GroupingPanelItem interface.

  The `isDraft` property of the DraftGrouping interface has been renamed to `draft`.
* **react-grid:**  
In order to reduce API verbosity, the `groupedColumns` and `draftGroupedColumns` getters are no longer exported from the GroupingState plugin.
 
The `column` field is no longer present in the GroupRow interface. So, to access the `column` field in groupCellTemplate and groupIndentCellTemplate of the TableGroupRow plugin, it is necessary to use `args.column` instead of `args.row.column`.
* **react-grid:** The `colspan` field passed to tableNoDataCellTemplate (the TableView plugin), detailCellTemplate (the TableRowDetail plugin) and groupCellTemplate (the TableGroupRow plugin) has been renamed to `colSpan`.
* **react-grid:** To simplify the Grid plugins API the `setRowSelection` action was removed from the `SelectionState` and `TableSelection` plugins.

  For now, to select a single row you can use the `setRowsSelection`  action in the following manner:

    ```js
    setRowsSelection({ rowIds: [/* rowId */] })
    ```
* **react-grid:**  
`TableRow` and `TableColumn` interfaces structure has been changed. Now, it wraps original rows and columns of the Grid component instead of patching it.

  Before:

  ```ts
  interface TableRow extends Row {
    type?: string;
  }
  interface TableColumn extends Column {
    type?: string;
  }
  ```

  After:

  ```ts
  interface TableRow {
    key: string;
    type: string;
    rowId?: number | string;
    row?: Row;
    height?: number;
  }
  interface TableColumn {
    key: string;
    type: string;
    column?: Column;
    width?: number;
  }
  ```


  The `CommandHeadingCellArgs` interface related to the TableEditColumn plugin no longer has `column` and `row` fields.



<a name="1.0.0-alpha.7"></a>
# [1.0.0-alpha.7](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2017-08-07)


### Bug Fixes

* **react-grid:** allow TableGroupRow to be placed before other table plugins ([#221](https://github.com/DevExpress/devextreme-reactive/issues/221)) ([bdc81a0](https://github.com/DevExpress/devextreme-reactive/commit/bdc81a0))
* **react-grid:** correct 'All' page size text rendering in MUI ([#242](https://github.com/DevExpress/devextreme-reactive/issues/242)) ([6bde2dd](https://github.com/DevExpress/devextreme-reactive/commit/6bde2dd))
* **react-grid:** fix grouping if TableGroupRow is placed before any other table plugin ([#218](https://github.com/DevExpress/devextreme-reactive/issues/218)) ([7e09c7e](https://github.com/DevExpress/devextreme-reactive/commit/7e09c7e))
* **react-grid:** pass style field to editCellTemplate of TableEditRow ([#235](https://github.com/DevExpress/devextreme-reactive/issues/235)) ([c45ef85](https://github.com/DevExpress/devextreme-reactive/commit/c45ef85)), closes [#234](https://github.com/DevExpress/devextreme-reactive/issues/234)
* **react-grid:** prevent group panel cells blinking while dragging ([#223](https://github.com/DevExpress/devextreme-reactive/issues/223)) ([786206d](https://github.com/DevExpress/devextreme-reactive/commit/786206d))
* **react-grid:** remove extra space at the right of GroupPanelCell when sorting is disabled ([#220](https://github.com/DevExpress/devextreme-reactive/issues/220)) ([257a337](https://github.com/DevExpress/devextreme-reactive/commit/257a337))
* **react-grid:** use correct cursors for dragging ([#224](https://github.com/DevExpress/devextreme-reactive/issues/224)) ([6269063](https://github.com/DevExpress/devextreme-reactive/commit/6269063))
* **react-grid-material-ui:** support indeterminate state for the select all checkbox ([#231](https://github.com/DevExpress/devextreme-reactive/issues/231)) ([6a5aab3](https://github.com/DevExpress/devextreme-reactive/commit/6a5aab3))


### Chores

* **react-grid-material-ui:** swap UMD bundle with CJS one in package entry ([#232](https://github.com/DevExpress/devextreme-reactive/issues/232)) ([9dd4273](https://github.com/DevExpress/devextreme-reactive/commit/9dd4273))


### Code Refactoring

* **react-grid:** add the most recently added row to the end ([#238](https://github.com/DevExpress/devextreme-reactive/issues/238)) ([442bdbc](https://github.com/DevExpress/devextreme-reactive/commit/442bdbc))


### Features

* **react-core:** implement dependencies support for PluginContainer ([#237](https://github.com/DevExpress/devextreme-reactive/issues/237)) ([6ef3be6](https://github.com/DevExpress/devextreme-reactive/commit/6ef3be6))


### BREAKING CHANGES

* **react-grid:** In order to improve API transparency, the most recently added row will be added to the end of the addedRows property of the EditingState plugin.
* **react-grid-material-ui:** UMD bundle for the `@devexpress/dx-react-grid-material-ui` package is no longer provided
* **react-grid:** Arguments of the `setPageSize` and `setCurrentPage` actions were simpilified. Now, to call these actions, a user can use `numbers` instead of `objects`. See the following code:
  ```
  setPageSize(5); // instead of setPageSize({ size: 5 })
  ```
  and
  ```
  setCurrentPage(1); // instead of setCurrentPage({ page: 1 })
  ```



<a name="1.0.0-alpha.6"></a>
# [1.0.0-alpha.6](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2017-07-24)


### Bug Fixes

* **react-core:** prevent scrolling while dragging ([#207](https://github.com/DevExpress/devextreme-reactive/issues/207)) ([e3e18a9](https://github.com/DevExpress/devextreme-reactive/commit/e3e18a9))
* **react-grid:** clear expanded groups after ungrouping ([#202](https://github.com/DevExpress/devextreme-reactive/issues/202)) ([d97809e](https://github.com/DevExpress/devextreme-reactive/commit/d97809e))
* **react-grid:** remove the totalPages getter from the PagingState plugin ([#195](https://github.com/DevExpress/devextreme-reactive/issues/195)) ([e231d63](https://github.com/DevExpress/devextreme-reactive/commit/e231d63))
* **react-grid:** throw error if the count of title rows exceeds the page size ([#193](https://github.com/DevExpress/devextreme-reactive/issues/193)) ([8abde20](https://github.com/DevExpress/devextreme-reactive/commit/8abde20))
* **react-grid:** turn edit cell input into the controlled mode ([#201](https://github.com/DevExpress/devextreme-reactive/issues/201)) ([af26c64](https://github.com/DevExpress/devextreme-reactive/commit/af26c64))
* **react-grid-material-ui:** pin material-ui version ([#197](https://github.com/DevExpress/devextreme-reactive/issues/197)) ([34e6ddb](https://github.com/DevExpress/devextreme-reactive/commit/34e6ddb))
* fix versions in distrubutives ([#208](https://github.com/DevExpress/devextreme-reactive/issues/208)) ([7c2f9da](https://github.com/DevExpress/devextreme-reactive/commit/7c2f9da))
* **react-grid-material-ui:** use correct typography for the drag preview ([#214](https://github.com/DevExpress/devextreme-reactive/issues/214)) ([e1a134d](https://github.com/DevExpress/devextreme-reactive/commit/e1a134d))


### Features

* **react-grid:** implement grouping by drag and drop ([#205](https://github.com/DevExpress/devextreme-reactive/issues/205)) ([ebb6c61](https://github.com/DevExpress/devextreme-reactive/commit/ebb6c61))


### Performance Improvements

* **react-grid:** update only changed rows in table ([#199](https://github.com/DevExpress/devextreme-reactive/issues/199)) ([e1c64ff](https://github.com/DevExpress/devextreme-reactive/commit/e1c64ff))


### Reverts

* fix(react-grid): grid bottom offset in Material UI ([#196](https://github.com/DevExpress/devextreme-reactive/issues/196)) ([e2392ed](https://github.com/DevExpress/devextreme-reactive/commit/e2392ed))


### BREAKING CHANGES

* **react-grid:** The TableHeaderRow plugin's `allowGrouping` property has been renamed to `allowGroupingByClick`.
* **react-grid:** The `totalPages` getter is no longer exported from the PagingState and LocalPaging plugins.



<a name="1.0.0-alpha.5"></a>
# [1.0.0-alpha.5](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2017-07-07)


### Bug Fixes

* **react-grid:** add grid bottom offset in Material UI ([#180](https://github.com/DevExpress/devextreme-reactive/issues/180)) ([48f12a2](https://github.com/DevExpress/devextreme-reactive/commit/48f12a2))
* **react-grid:** add group icon offset in Material UI ([#171](https://github.com/DevExpress/devextreme-reactive/issues/171)) ([43d9da1](https://github.com/DevExpress/devextreme-reactive/commit/43d9da1))
* **react-grid:** limit filterCellTemplate arguments ([#163](https://github.com/DevExpress/devextreme-reactive/issues/163)) ([2a4f003](https://github.com/DevExpress/devextreme-reactive/commit/2a4f003))
* **react-grid:** reset a column filter when clearing the filter editor value ([#184](https://github.com/DevExpress/devextreme-reactive/issues/184)) ([83b321c](https://github.com/DevExpress/devextreme-reactive/commit/83b321c)), closes [#136](https://github.com/DevExpress/devextreme-reactive/issues/136)
* **react-grid:** use MUI Chips for group panel items rendering ([#168](https://github.com/DevExpress/devextreme-reactive/issues/168)) ([45ceb12](https://github.com/DevExpress/devextreme-reactive/commit/45ceb12))


### Code Refactoring

* **react-grid:** extract GroupPanelLayout ([#149](https://github.com/DevExpress/devextreme-reactive/issues/149)) ([ed73aa1](https://github.com/DevExpress/devextreme-reactive/commit/ed73aa1))


### Features

* **react-grid:** introduce column reordering animation ([#169](https://github.com/DevExpress/devextreme-reactive/issues/169)) ([d5e808b](https://github.com/DevExpress/devextreme-reactive/commit/d5e808b))
* **react-grid:** introduce Material UI templates (closes [#93](https://github.com/DevExpress/devextreme-reactive/issues/93))


### BREAKING CHANGES

* **react-grid:** Use the `groupPanelCellTemplate` property of the grouping-panel plugin instead of the GroupPanelProps interface's `cellTemplate` property to specify a template used to render a grouping panel cell. The GroupPanelProps interface's `cellTemplate` property is no longer available.



<a name="1.0.0-alpha.4"></a>
# [1.0.0-alpha.4](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2017-06-23)


### Bug Fixes

* **react-grid:** Add a vertical space between grouping buttons ([#151](https://github.com/DevExpress/devextreme-reactive/issues/151)) ([ec1bd30](https://github.com/DevExpress/devextreme-reactive/commit/ec1bd30))
* **react-grid:** Add an offset for left column in Material UI ([#156](https://github.com/DevExpress/devextreme-reactive/issues/156)) ([67d0eda](https://github.com/DevExpress/devextreme-reactive/commit/67d0eda))
* **react-grid:** Fix incorrect table layout if all columns have fixed width ([#160](https://github.com/DevExpress/devextreme-reactive/issues/160)) ([b933aea](https://github.com/DevExpress/devextreme-reactive/commit/b933aea))
* **react-grid:** Put the dx-react-grid dependencies in order ([#148](https://github.com/DevExpress/devextreme-reactive/issues/148)) ([fe60801](https://github.com/DevExpress/devextreme-reactive/commit/fe60801))
* **react-grid:** Update deps (fixes [#134](https://github.com/DevExpress/devextreme-reactive/issues/134)) ([#139](https://github.com/DevExpress/devextreme-reactive/issues/139)) ([5bf504a](https://github.com/DevExpress/devextreme-reactive/commit/5bf504a))


### Code Refactoring

* **react-grid:** Rename detailToggleTemplate to detailToggleCellTemplate ([#146](https://github.com/DevExpress/devextreme-reactive/issues/146)) ([bd49b0e](https://github.com/DevExpress/devextreme-reactive/commit/bd49b0e))
* **react-grid:** Rename groupColumnWidth to groupIndentColumnWidth ([#145](https://github.com/DevExpress/devextreme-reactive/issues/145)) ([e78b55f](https://github.com/DevExpress/devextreme-reactive/commit/e78b55f))
* **react-grid:** Rename groupRowCellTemplate to groupCellTemplate ([#153](https://github.com/DevExpress/devextreme-reactive/issues/153)) ([fec0aac](https://github.com/DevExpress/devextreme-reactive/commit/fec0aac))


### Features

* **react-grid:** Ability to show all rows on a page via page size selector ([#150](https://github.com/DevExpress/devextreme-reactive/issues/150)) ([8af3dde](https://github.com/DevExpress/devextreme-reactive/commit/8af3dde))
* **react-grid:** Implement column reordering ([#128](https://github.com/DevExpress/devextreme-reactive/issues/128)) ([1de1c63](https://github.com/DevExpress/devextreme-reactive/commit/1de1c63))
* **react-grid:** TableView support stub cell rendering if no data for cell is provided ([#155](https://github.com/DevExpress/devextreme-reactive/issues/155)) ([34dee6c](https://github.com/DevExpress/devextreme-reactive/commit/34dee6c))


### BREAKING CHANGES

* **react-grid:** The following package has become a peer dependency of the `@devexpress/dx-react-grid` one and has to be installed by your app:

  ```
  npm i --save @devexpress/dx-react-core
  ```

* **react-grid:** The 'groupRowCellTemplate' property of the TableGroupRow plugin has been renamed to 'groupCellTemplate'
* **react-grid:** We renamed the `detailToggleTemplate` property of the TableRowDetail plugin to `detailToggleCellTemplate` to make it consistent with the `detailToggleCellWidth` property.
* **react-grid:** The groupColumnWidth property of the TableGroupRow plugin has been renamed to groupIndentColumnWidth to avoid possible confusion of what it is responsible for.



<a name="1.0.0-alpha.3"></a>
# [1.0.0-alpha.3](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2017-06-09)


### Bug Fixes

* **react-grid:** Cancel sorting by using the Ctrl key in Material UI ([#129](https://github.com/DevExpress/devextreme-reactive/issues/129)) ([2508537](https://github.com/DevExpress/devextreme-reactive/commit/2508537))
* **react-grid:** Treat templates as functions ([#120](https://github.com/DevExpress/devextreme-reactive/issues/120)) ([4b2c490](https://github.com/DevExpress/devextreme-reactive/commit/4b2c490))


### Code Refactoring

* **react-grid:** Move layout templates to Grid ([#107](https://github.com/DevExpress/devextreme-reactive/issues/107)) ([f6be302](https://github.com/DevExpress/devextreme-reactive/commit/f6be302))


### Features

* **react-grid:** Controlled state featured demo for Material UI ([#130](https://github.com/DevExpress/devextreme-reactive/issues/130)) ([2528c67](https://github.com/DevExpress/devextreme-reactive/commit/2528c67))
* **react-grid:** Implement ColumnOrderState plugin ([#111](https://github.com/DevExpress/devextreme-reactive/issues/111)) ([b3284f0](https://github.com/DevExpress/devextreme-reactive/commit/b3284f0))
* **react-grid:** Implement DragDropContext plugin ([#117](https://github.com/DevExpress/devextreme-reactive/issues/117)) ([31f6b2d](https://github.com/DevExpress/devextreme-reactive/commit/31f6b2d))
* **react-grid:** Introduce Material UI templates ([#102](https://github.com/DevExpress/devextreme-reactive/issues/102)) ([70975a7](https://github.com/DevExpress/devextreme-reactive/commit/70975a7))
* **react-grid:** Material UI detail row ([#115](https://github.com/DevExpress/devextreme-reactive/issues/115)) ([c161c66](https://github.com/DevExpress/devextreme-reactive/commit/c161c66))
* **react-grid:** Material UI editing ([#124](https://github.com/DevExpress/devextreme-reactive/issues/124)) ([3d9a00b](https://github.com/DevExpress/devextreme-reactive/commit/3d9a00b))
* **react-grid:** Material UI featured uncontrolled state demo ([#126](https://github.com/DevExpress/devextreme-reactive/issues/126)) ([8e1d80b](https://github.com/DevExpress/devextreme-reactive/commit/8e1d80b))
* **react-grid:** Material UI filtering ([#109](https://github.com/DevExpress/devextreme-reactive/issues/109)) ([5484942](https://github.com/DevExpress/devextreme-reactive/commit/5484942))
* **react-grid:** Material UI pager ([#108](https://github.com/DevExpress/devextreme-reactive/issues/108)) ([99f30b6](https://github.com/DevExpress/devextreme-reactive/commit/99f30b6))
* **react-grid:** Mobile-friendly pager ([#125](https://github.com/DevExpress/devextreme-reactive/issues/125)) ([23ec7f0](https://github.com/DevExpress/devextreme-reactive/commit/23ec7f0))
* **react-grid:** Redux integration demo for Material UI ([#132](https://github.com/DevExpress/devextreme-reactive/issues/132)) ([9988355](https://github.com/DevExpress/devextreme-reactive/commit/9988355))
* **react-grid:** Remote data featured demo for Material UI ([#131](https://github.com/DevExpress/devextreme-reactive/issues/131)) ([41b64b2](https://github.com/DevExpress/devextreme-reactive/commit/41b64b2))
* **react-grid:** Use column name if its title is not specified ([#121](https://github.com/DevExpress/devextreme-reactive/issues/121)) ([daef7db](https://github.com/DevExpress/devextreme-reactive/commit/daef7db))


### BREAKING CHANGES

* **react-grid:** We moved layout templates from the TableView plugin to the Grid component. The Grid component with the predefined plugins is now available in the "@devexpress/dx-react-grid-bootstrap3" package. If you want to define custom layout templates, the Grid component without predefined templates is still available in the "devexpress/dx-react-grid" package.

  The following code:

  ```jsx
  import {
    Grid
  } from '@devexpress/dx-react-grid';
  ```

  should be replaced with:

  ```jsx
  import {
    Grid
  } from '@devexpress/dx-react-grid-bootstrap3';
  ```



<a name="1.0.0-alpha.2"></a>
# [1.0.0-alpha.2](https://github.com/DevExpress/devextreme-reactive/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2017-05-26)


### Bug Fixes

* **demos:** Change initial page size in remote demo ([#103](https://github.com/DevExpress/devextreme-reactive/issues/103)) ([aa64e3c](https://github.com/DevExpress/devextreme-reactive/commit/aa64e3c))
* **docs:** Don't use relative links in the package root readme.md ([#91](https://github.com/DevExpress/devextreme-reactive/issues/91)) ([6863e73](https://github.com/DevExpress/devextreme-reactive/commit/6863e73))
* **react-grid:** Cancel column grouping in FireFox ([#98](https://github.com/DevExpress/devextreme-reactive/issues/98)) ([8fb9c52](https://github.com/DevExpress/devextreme-reactive/commit/8fb9c52)), closes [#30](https://github.com/DevExpress/devextreme-reactive/issues/30)


### Features

* **react-grid:** Cancel sorting by using the Ctrl key ([#96](https://github.com/DevExpress/devextreme-reactive/issues/96)) ([0d804f4](https://github.com/DevExpress/devextreme-reactive/commit/0d804f4))
* **react-grid:** Implement page size selector ([#95](https://github.com/DevExpress/devextreme-reactive/issues/95)) ([9e21583](https://github.com/DevExpress/devextreme-reactive/commit/9e21583))


### BREAKING CHANGES

* Previously, to enable the 'Detail row' feature a user had to use only the 'TableRowDetail' plugin. But, this plugin mixed up the rendering and state managing functionality. Now, there are two particular plugins. The first one is the 'RowDetailState' plugin. It's responsible for a state managing. The second one is the 'TableRowDetail' plugin. It only renders a detail row.

  The following code:

  ```jsx
  <TableRowDetail
    expandedRows={expandedRows}
    onExpandedRowsChange={onExpandedRowsChange}
    template={({ row }) =>
      <GridDetailContainer
        data={row}
        columns={detailColumns}
      />
    }
  />
  ```

  should be replaced with:

  ```jsx
  <RowDetailState
    expandedRows={expandedRows}
    onExpandedRowsChange={onExpandedRowsChange}
  />
  <TableRowDetail
    template={({ row }) =>
      <GridDetailContainer
        data={row}
        columns={detailColumns}
      />
    }
  />
  ```

<a name="1.0.0-alpha.1"></a>
# 1.0.0-alpha.1 (2017-05-15)

* Initial public release
