import * as React from 'react';
import { Column } from '../grid';

export interface ValueFormatterProps {
  /** A column object. */
  column: Column;
  /** A row. */
  row?: any;
  /** The value to be formatted. */
  value: any;
}

export interface ValueEditorProps {
  /** A column object. */
  column: Column;
  /** A row. */
  row?: any;
  /** Specifies the editor value. */
  value: any;
  /** Handles value changes. */
  onValueChange: (newValue: any) => void;
}

export interface DataTypeProviderProps {
  /** The names of columns associated with the specified formatter and editor. */
  for: Array<string>;
  /** A component that renders the formatted value. */
  formatterComponent: React.ComponentType<ValueFormatterProps>;
  /** A component that renders a custom editor. */
  editorComponent: React.ComponentType<ValueEditorProps>;
}

export declare const DataTypeProvider: React.ComponentType<DataTypeProviderProps>;
