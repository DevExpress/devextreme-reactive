// tslint:disable-next-line:no-namespace
export namespace IntegratedGrouping {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    // tslint:disable-next-line:max-line-length
    /** A grouping criterion function. It returns an object with the **key** field by which data is grouped. If you need to group data by a non-primitive value (for example, a date), assign its string representation to the **key** field and the value to the **value** field. */
    criteria?: (value: any) => { key: string | number, value?: any };
  }
}

export interface IntegratedGroupingProps {
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<IntegratedGrouping.ColumnExtension>;
}
