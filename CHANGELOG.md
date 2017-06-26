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
