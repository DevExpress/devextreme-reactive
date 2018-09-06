import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { axisCoordinates, axesData } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { Axis } from './axis';

jest.mock('@devexpress/dx-chart-core', () => ({
  axisCoordinates: jest.fn(),
  axesData: jest.fn(),
}));

describe('Axis', () => {
  // eslint-disable-next-line react/prop-types
  const RootComponent = ({ children }) => (
    <div>
      {children}
    </div>
  );
  const TickComponent = () => null;
  const LabelComponent = () => null;
  const LineComponent = () => null;
  const defaultDeps = {
    getter: {
      domains: { name: { orientation: 'horizontal', type: 'someType' } },
      setBBox: jest.fn(),
      argumentAxisName: 'argumentAxis',
      layouts: {
        'bottom-axis': {
          x: 1, y: 2, width: 200, height: 100,
        },
      },
      axes: [{}],
      scaleExtension: [{ type: 'someType', constructor: 'constructor' }],
    },
    template: {
      'bottom-axis': {},
    },
  };
  const defaultProps = {
    min: 0,
    position: 'bottom',
    name: 'name',
    rootComponent: RootComponent,
    tickComponent: TickComponent,
    labelComponent: LabelComponent,
    lineComponent: LineComponent,
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
        key: '1',
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
        key: '2',
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
    expect(x).toBe(-0);
    expect(y).toBe(-0);
    expect(refsHandler).toEqual(expect.any(Function));
    expect(children).toEqual(expect.any(Object));
  });


  it('should render argument axis', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis
          {...{ ...defaultProps, isArgumentAxis: true }}
        />
      </PluginHost>
    ));

    const {
      x, y, refsHandler, children,
    } = tree.find(RootComponent).props();
    expect(x).toBe(-0);
    expect(y).toBe(-0);
    expect(refsHandler).toEqual(expect.any(Function));
    expect(children).toEqual(expect.any(Object));
    expect(getComputedState(tree).argumentAxisName).toBe('name');
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

    expect(axisCoordinates).toHaveBeenCalledWith({ orientation: 'horizontal', type: 'someType' }, 'bottom', 200, 100, 5, 10, 'constructor');
  });

  it('should pass axisCoordinates method correct parameters, vertical orientation', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            domains: { name: { orientation: 'vertical', type: 'someType' } },
            layouts: {
              'bottom-axis': {
                x: 3, y: 4, width: 250, height: 150,
              },
            },
          },
        })}
        <Axis
          {...defaultProps}
          tickSize={6}
        />
      </PluginHost>
    ));

    expect(axisCoordinates).toHaveBeenCalledWith({ orientation: 'vertical', type: 'someType' }, 'bottom', 250, 150, 6, 10, 'constructor');
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

  it('should render line component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(LineComponent).props()).toEqual({
      height: 100,
      width: 200,
      orientation: 'horizontal',
    });
  });

  it('should pass axesData correct arguments', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(axesData).toHaveBeenCalledWith(
      expect.arrayContaining([{}]),
      expect.objectContaining(defaultProps),
    );
  });
});
