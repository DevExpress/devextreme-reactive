/* tslint:disable no-submodule-imports */
import * as Excel from 'exceljs/dist/exceljs.min.js';
/* tslint:enable no-submodule-imports */

export const createWorkbook = () => new Excel.Workbook();

export const createWorksheet = (workbook: Excel.Workbook) => workbook.addWorksheet('Main');
