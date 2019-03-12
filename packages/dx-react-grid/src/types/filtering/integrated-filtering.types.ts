import { IntegratedFiltering, Filter } from '../index';

export type IntegratedFilteringProps = {
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: IntegratedFiltering.ColumnExtension[];
};

export type DefaultPredicateFn = (value: any, filter: Filter, row: any) => boolean;
