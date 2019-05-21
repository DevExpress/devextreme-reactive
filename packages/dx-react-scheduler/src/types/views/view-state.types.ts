export interface ViewStateProps {
  /** The current date. */
  currentDate?: number | string | Date;
  /** The initial date in the uncontrolled mode. */
  defaultCurrentDate?: number | string | Date;
  /** Handles changes to the current date. */
  onCurrentDateChange?: (currentDate: Date) => void;
  /** The displayed view’s name. */
  currentViewName?: string;
  /** The initially displayed view’s name in the uncontrolled mode. */
  defaultCurrentViewName?: string;
  /** Handles changes to the displayed view. */
  onCurrentViewNameChange?: (viewName: string) => void;
}

/** @internal */
export type ViewStateState = {
  currentDate: number | string | Date;
  currentViewName: string;
};
