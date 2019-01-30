export interface SearchStateProps {
  /** Specifies the applied search value. */
  value?: string;
  /** Specifies the search value initially applied in the uncontrolled mode. */
  defaultValue?: string;
  /** Handles search value changes. */
  onValueChange?: (value: string) => void;
}

/** @internal */
export type SearchStateState = {
  value: string,
};
