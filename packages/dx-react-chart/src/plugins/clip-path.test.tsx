import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { ClipPath } from './clip-path';
import { ClipPath as ClipRect } from '../templates/clip-path';

jest.mock('../templates/clip-path', () => ({
  ClipPath: () => null,
}));

describe('Clip Path', () => {
  const defaultDeps = {
    getter: {
      layouts: {
        pane: { width: 400, height: 500 },
      },
    },
    template: {
      series: {},
    },
  };
  it('should create clip path', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ClipPath id={'defaultId'} />
      </PluginHost>
    ));

    expect(tree.find(ClipRect).props()).toEqual({
      id: 'defaultId',
      width: 400,
      height: 500,
    });
  });
});
