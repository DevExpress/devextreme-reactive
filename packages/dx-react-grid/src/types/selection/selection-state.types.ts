export interface SelectionStateProps {
  /** The selected row's IDs. */
  selection?: Array<number | string>;
  /** The initially selected rows in the uncontrolled mode. */
  defaultSelection?: Array<number | string>;
  /** Handles selection changes. */
  onSelectionChange?: (selection: Array<number | string>) => void;
}

/** @internal */
export type SelectionStateState = {
  selection: (number | string)[];
};
