import { PureComputed } from "@devexpress/dx-core/src";

export const isMonthCell: PureComputed<
  [boolean | undefined], boolean
> = otherMonth => otherMonth === undefined ? false : true;
