import * as React from 'react';

export interface IntegratedFilteringColumnExtension {
  /** The name of a column to extend. */
  columnName: string;
  /** A filter predicate. The `filter` parameter accepts an object containing the 'value' field. Note that you can use the onFilter event to extend this object to the fields your filtering algorithm requires. */
  predicate?: (value: any, filter: Object, row: any) => boolean;
}

export interface IntegratedFilteringProps {
  /** Additional column properties that the plugin can handle. */
  columnExtensions: Array<IntegratedFilteringColumnExtension>;
}

export declare const IntegratedFiltering: React.ComponentType<IntegratedFilteringProps>;
