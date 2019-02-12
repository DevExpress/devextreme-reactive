import { PureReducer, PureComputed } from '@devexpress/dx-core';

export type StateHelper = {
  applyReducer: PureComputed<[PureReducer, any?, PureReducer?], void>;
  applyFieldReducer: PureComputed<[string, PureReducer, any], void>
};

export type CreateStateHelperFn = PureComputed<
  [React.PureComponent, { [fieldName: string]: () => ActionFn<any> | undefined }?],
  StateHelper
>;

export type ActionFn<P> = PureComputed<[P], void | boolean>;
export type Size = {
  width: number;
  height: number;
};

export type SizerProps = {
  onSizeChange: (size: Size) => void;
  onScroll?: (e) => void;
  containerComponent?: any;
  style?: object;
};
