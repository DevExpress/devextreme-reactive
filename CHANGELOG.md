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
