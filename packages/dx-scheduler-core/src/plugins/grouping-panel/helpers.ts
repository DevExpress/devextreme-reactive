import { PureComputed } from '@devexpress/dx-core';
import { Group } from '../../types';

export const extractLastRowFromGroups: PureComputed<
  [Group[][]], Group[][]
> = (groups) => {
  return [
    groups[groups.length - 1].map(group => ({
      ...group,
      text: '',
    })),
  ];
};
