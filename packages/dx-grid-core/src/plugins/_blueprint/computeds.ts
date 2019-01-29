import { PureComputed } from '@devexpress/dx-core';

// tslint:disable-next-line: space-in-parens
export const pureComputed: PureComputed<[string[], number?]> = (param1, param2) => {
  // tslint:disable-next-line:prefer-const
  const result = param1.slice();

  // ...

  return result;
};
