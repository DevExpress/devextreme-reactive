import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { axisCoordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '../../../dx-testing/test-utils';
import { Axis } from './axis';

jest.mock('@devexpress/dx-chart-core', () => ({
  axisCoordinates: jest.fn(),
}));

describe('Axis', () => {
  // eslint-disable-next-line react/prop-types
  const RootComponent = ({ children }) => <div>{children}</div>;
  const TickComponent = () => null;
  const LabelComponent = () => null;
  const defaultDeps = {
    getter: {
      domains: { name: { orientation: 'horizontal' } },
      setBBox: jest.fn(),
      layouts: {
        'bottom-center': {
          x: 1, y: 2, width: 200, height: 100,
        },
      },
    },
    template: {
      canvas: {},
    },
  };
  const defaultProps = {
    position: 'bottom',
    name: 'name',
    rootComponent: RootComponent,
    tickComponent: TickComponent,
    labelComponent: LabelComponent,
  };

  beforeEach(() => {
    axisCoordinates.mockImplementation(() => ({
      ticks: [{
        text: 'text1',
        x1: 1,
        x2: 2,
        y1: 3,
        y2: 4,
        xText: 'xText1',
        yText: 'yText1',
        dominantBaseline: 'dominantBaseline1',
        textAnchor: 'textAnchor1',
      },
      {
        text: 'text2',
        x1: 11,
        x2: 22,
        y1: 33,
        y2: 44,
        xText: 'xText2',
        yText: 'yText2',
        dominantBaseline: 'dominantBaseline2',
        textAnchor: 'textAnchor2',
      }],
    }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render root component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis
          {...defaultProps}
        />
      </PluginHost>
    ));

    const {
      x, y, refsHandler, children,
    } = tree.find(RootComponent).props();
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(refsHandler).toEqual(expect.any(Function));
    expect(children).toEqual(expect.any(Object));
  });

  it('should pass axisCoordinates method correct parameters, horizontal orientation', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(axisCoordinates).toHaveBeenCalledWith({ orientation: 'horizontal' }, 'bottom', 200, 100);
  });

  it('should pass axisCoordinates method correct parameters, vertical orientation', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            domains: { name: { orientation: 'vertical' } },
            layouts: {
              'center-bottom': {
                x: 3, y: 4, width: 250, height: 150,
              },
            },
          },
        })}
        <Axis
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(axisCoordinates).toHaveBeenCalledWith({ orientation: 'vertical' }, 'bottom', 250, 150);
  });

  it('should render tick component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(tree.find(TickComponent).get(0).props).toEqual({
      x1: 1,
      x2: 2,
      y1: 3,
      y2: 4,
    });
    expect(tree.find(TickComponent).get(1).props).toEqual({
      x1: 11,
      x2: 22,
      y1: 33,
      y2: 44,
    });
  });

  it('should render label component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(LabelComponent).get(0).props).toEqual({
      x: 'xText1',
      y: 'yText1',
      dominantBaseline: 'dominantBaseline1',
      textAnchor: 'textAnchor1',
      text: 'text1',
    });

    expect(tree.find(LabelComponent).get(1).props).toEqual({
      x: 'xText2',
      y: 'yText2',
      dominantBaseline: 'dominantBaseline2',
      textAnchor: 'textAnchor2',
      text: 'text2',
    });
  });
});
