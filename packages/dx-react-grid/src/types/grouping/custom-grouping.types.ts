import { Grouping, GroupKey } from '../index';

/* tslint:disable max-line-length */
export interface CustomGroupingProps {
  /** A function that extracts groups from the specified data. It is executed recursively for the root and nested groups. */
  getChildGroups: (currentRows: Array<any>, grouping: Grouping, rootRows: Array<any>) => Array<{ key: number | string, value?: any, childRows?: Array<any> }>;
  /** Specifies columns by which data is grouped. */
  grouping?: Grouping[] | null;
  /** Specifies the expanded groups. */
  expandedGroups?: GroupKey[] | null;
}
/* tslint:enable max-line-length */
