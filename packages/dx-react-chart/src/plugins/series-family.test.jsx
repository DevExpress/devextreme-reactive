import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { processData, seriesWithStacks, stacks } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { SeriesFamily } from './series-family';

jest.mock('@devexpress/dx-chart-core', () => ({
  processData: jest.fn(),
  seriesWithStacks: jest.fn(),
  stacks: jest.fn(),
}));

describe('Series Family', () => {
  beforeEach(() => {
    processData.mockImplementation(() => 'processData');
    seriesWithStacks.mockImplementation(() => 'seriesWithStacks');
    stacks.mockImplementation(() => 'stacks');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide optinos', () => {
    const tree = mount((
      <PluginHost>
        <SeriesFamily />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      processingData: processData,
      series: 'seriesWithStacks',
      stacks: 'stacks',
    });
  });
});
