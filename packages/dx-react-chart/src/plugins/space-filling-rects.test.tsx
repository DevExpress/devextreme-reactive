import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { SpaceFillingRects } from './space-filling-rects';
import {
  TOP, BOTTOM, LEFT, RIGHT,
} from '@devexpress/dx-chart-core';

const defaultDeps = {
  getter: {
    layouts: {
      'left-axis-default': { width: 20 },
      'left-axis-custom': { width: 30 },
      'right-axis-default': { width: 13 },
    },
  },
  template: {
    [`${TOP}-${LEFT}-axis`]: {},
    [`${TOP}-${RIGHT}-axis`]: {},
    [`${BOTTOM}-${LEFT}-axis`]: {},
    [`${BOTTOM}-${RIGHT}-axis`]: {},
  },
};

const defaultProps = {
  placeholders: [
    `${TOP}-${LEFT}-axis`,
    `${TOP}-${RIGHT}-axis`,
    `${BOTTOM}-${LEFT}-axis`,
    `${BOTTOM}-${RIGHT}-axis`,
  ],
};

describe('SpaceFillingRects', () => {
  it('should render rects', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <SpaceFillingRects
          {...defaultProps}
        />
      </PluginHost>));
    expect(tree.find(`#${TOP}-${LEFT}-axis`).props().style)
      .toEqual({ width: 50 });

    expect(tree.find(`#${TOP}-${RIGHT}-axis`).props().style)
      .toEqual({ width: 13 });

    expect(tree.find(`#${BOTTOM}-${LEFT}-axis`).props().style)
      .toEqual({ width: 50 });

    expect(tree.find(`#${BOTTOM}-${RIGHT}-axis`).props().style)
      .toEqual({ width: 13 });
  });
});
