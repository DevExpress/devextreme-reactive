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
