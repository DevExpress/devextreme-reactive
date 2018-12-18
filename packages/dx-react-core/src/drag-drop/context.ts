import * as React from 'react';
import { DragDropProviderCore } from './provider';

export const DragDropContext = React.createContext<DragDropProviderCore | null>(null);
