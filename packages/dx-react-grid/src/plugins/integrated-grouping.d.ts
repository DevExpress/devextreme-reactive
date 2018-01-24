import * as React from 'react';

export interface IntegratedGroupingColumnExtension {
  /** The name of a column to extend. */
  columnName: string;
  /** A grouping criterion function. It returns an object with the **key** field by which data is grouped. If you need to group data by a non-primitive value (for example, a date), assign its string representation to the **key** field and the value to the **value** field. */
  criteria?: (value: any) => { key: string | number, value?: any };
}

export interface IntegratedGroupingProps {
  /** Additional column properties that the plugin can handle. */
  columnExtensions: Array<IntegratedGroupingColumnExtension>;
}

export declare const IntegratedGrouping: React.ComponentType<IntegratedGroupingProps>;
