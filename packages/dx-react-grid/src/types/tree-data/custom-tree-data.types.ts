export interface CustomTreeDataProps {
// tslint:disable-next-line: max-line-length
  /** A function that extracts child rows from the specified data. It is executed recursively for the root and nested rows. The `currentRow` parameter is `null` for root rows. The return value should be null if a row is a leaf, otherwise, it should be an array of rows. If child rows are not available, the function should return an empty array. */
  getChildRows: (currentRow: any | null, rootRows: Array<any>) => Array<any> | null;
}
