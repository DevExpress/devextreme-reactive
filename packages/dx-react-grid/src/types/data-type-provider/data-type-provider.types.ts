import { Column, FilterOperation } from '../index';

// tslint:disable-next-line: no-namespace
export namespace DataTypeProvider {
  /** Describes properties passed to a component that renders the formatted value. */
  export interface ValueFormatterProps {
    /** A column object. */
    column: Column;
    /** A row. */
    row?: any;
    /** The value to be formatted. */
    value: any;
  }

  /** Describes properties passed to a component that renders the value editor. */
  export interface ValueEditorProps {
    /** A column object. */
    column: Column;
    /** A row. */
    row?: any;
    /** Specifies the editor value. */
    value: any;
    /** Handles value changes. */
    onValueChange: (newValue: any) => void;
    /** "true" if users should not be able to edit the value; otherwise, "false". */
    disabled: boolean;
    /** "true" if the editor should be focused on render; otherwise "false". */
    autoFocus: boolean;
    // tslint:disable-next-line: max-line-length
    /** Calls the `EditingState` plugin's `commitChanges` handler and switches the editor from edit state when it loses focus (used for Inline Cell Editing). */
    onBlur: () => void;
    /** Applies an action when the editor gets focus (used for Inline Cell Editing). */
    onFocus: () => void;
    // tslint:disable-next-line: max-line-length
    /** Handles key press: Enter saves changes, Esc discards them and switches the editor from edit state (used for Inline Cell Editing). */
    onKeyDown: () => void;
  }
}

export interface DataTypeProviderProps {
  /** The names of columns associated with the specified formatter and editor. */
  for: Array<string>;
  /** A component that renders the formatted value. */
  formatterComponent?: React.ComponentType<DataTypeProvider.ValueFormatterProps>;
  /** A component that renders a custom editor. */
  editorComponent?: React.ComponentType<DataTypeProvider.ValueEditorProps>;
  /** The names of filter operations that are available for the associated columns. */
  availableFilterOperations?: Array<FilterOperation>;
}
