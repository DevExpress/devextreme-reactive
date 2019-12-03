/** Configures a single grouping item the appointments may belong to. */
export type GroupingItem = {
  /** The ID of the corresponding resource the appointments are grouped by. */
  id: number | string;
  /** The grouping item text. */
  text: string;
  /** The corresponding resource's filedName. */
  fieldName: string;
};
