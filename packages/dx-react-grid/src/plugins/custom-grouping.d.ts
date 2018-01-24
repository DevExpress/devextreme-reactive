import * as React from 'react';
import { Grouping, GroupKey } from './grouping-state';

export interface CustomGroupingProps {
  /** A function that extracts groups from the specified data. It is executed recursively for the root and nested groups. */
  getChildGroups: (currentRows: Array<any>, grouping: Grouping, rootRows: Array<any>) => Array<{ key: number | string, value?: any, childRows?: Array<any> }>;
  /** Specifies columns by which data is grouped. */
  grouping: Array<Grouping>;
  /** Specifies the expanded groups. */
  expandedGroups: Array<GroupKey>;
}

export declare const CustomGrouping: React.ComponentType<CustomGroupingProps>;
