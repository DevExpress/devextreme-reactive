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
    /** "true" if users should not be able to edit the value, "false" otherwise. */
    disabled: boolean;
    /** "true" if editor should be focused on render, "false" otherwise. */
    autoFocus: boolean;
    /** Switches editor from editing state on editor lose focus (uses for Inline Cell Editing) */
    onBlur: () => void;
    /** Apply action on editor get focus (uses for Inline Cell Editing) */
    onFocus: () => void;
    // tslint:disable-next-line: max-line-length
    /** Handles key press: Enter to save changes, or Esc to discard the changes and deactivate the cell editor (uses for Inline Cell Editing) */
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
