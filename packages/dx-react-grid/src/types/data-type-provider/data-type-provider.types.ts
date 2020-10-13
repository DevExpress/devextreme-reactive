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
    /** Specifies the editor value. */
    value: any;
    /** Handles value changes. */
    onValueChange: (newValue: any) => void;
	/** Specifies the editor value. */
    onBlur: any;
	/** Where the autoFocus was set to enabled */
	autoFocus: boolean;

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
