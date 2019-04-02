import { Column } from './grid-core.types';

export interface ColumnChooserItem {
  /** The grid column associated with the item. */
  column: Column;
  /** Specifies whether the associated column is hidden. */
  hidden: boolean;
}
