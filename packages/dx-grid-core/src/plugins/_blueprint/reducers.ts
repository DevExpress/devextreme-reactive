import { PureReducer } from '@devexpress/dx-core';

type State = { names: string[] };
type Payload = { columnName: string };

// tslint:disable-next-line: space-in-parens
export const pureReducer: PureReducer<State, Payload> = (state, payload) => {
  // tslint:disable-next-line:prefer-const
  const nextState = { names: [...state.names, payload.columnName] };

  // do not mutate state

  return nextState;
};
