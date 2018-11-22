import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { axisCoordinates, axesData } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { Axis } from './axis';

jest.mock('@devexpress/dx-chart-core', () => ({
  axisCoordinates: jest.fn(),
  axesData: jest.fn(),
  LEFT: 'left',
  BOTTOM: 'bottom',
}));

describe('Axis', () => {
  const mockScale = jest.fn();
  mockScale.copy = jest.fn().mockReturnValue(mockScale);
  mockScale.range = jest.fn(arg => (arg === undefined ? [1, 2] : mockScale));

  // eslint-disable-next-line react/prop-types
  const RootComponent = ({ children }) => (
    <div>
      {children}
    </div>
  );
  const TickComponent = () => null;
  const LabelComponent = () => null;
  const LineComponent = () => null;

  const getterForAxis = position => ({
    getter: {
      layouts: {
        [`${position}-axis`]: { width: 250, height: 150 },
      },
    },
    template: {
      [`${position}-axis`]: {},
    },
  });

  const defaultDeps = {
    getter: {
      scales: {
        'test-domain': mockScale,
      },
      layouts: {
        'bottom-axis': {
          width: 200, height: 100,
        },
      },
      axes: [{}],
    },
    action: {
      changeBBox: jest.fn(),
    },
    template: {
      'bottom-axis': {},
    },
  };

  const defaultProps = {
    position: 'bottom',
    name: 'test-domain',
    rootComponent: RootComponent,
    tickComponent: TickComponent,
    labelComponent: LabelComponent,
    lineComponent: LineComponent,
  };

  const mockTicks = [
    {
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
    },
  ];

  const setupAxisCoordinates = (sides) => {
    axisCoordinates.mockReturnValue({ sides, ticks: mockTicks });
  };

  afterEach(() => {
    jest.clearAllMocks();
    axisCoordinates.mockReset();
  });

  it('should render root component', () => {
    setupAxisCoordinates([1, 0]);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis {...defaultProps} />
      </PluginHost>
    ));

    expect(tree.find(RootComponent).props()).toEqual({
      dx: 1,
      dy: 0,
      onSizeChange: expect.any(Function),
      children: expect.anything(),
    });
  });

  it('should pass correct bbox, vertical-left position', () => {
    setupAxisCoordinates([1, 0]);
    const tree = mount((
      <PluginHost>
        <Axis {...defaultProps} position="left" />
        {pluginDepsToComponents(defaultDeps, getterForAxis('left'))}
      </PluginHost>
    ));

    tree.find(RootComponent).props().onSizeChange({ tag: 'size' });

    expect(defaultDeps.action.changeBBox.mock.calls[0][0]).toEqual({
      placeholder: 'left-axis', bBox: { tag: 'size' },
    });
  });

  it('should pass correct bbox, vertical-right position', () => {
    setupAxisCoordinates([1, 0]);
    const tree = mount((
      <PluginHost>
        <Axis {...defaultProps} position="right" />
        {pluginDepsToComponents(defaultDeps, getterForAxis('right'))}
      </PluginHost>
    ));

    tree.find(RootComponent).props().onSizeChange({ tag: 'size' });

    expect(defaultDeps.action.changeBBox.mock.calls[0][0]).toEqual({
      placeholder: 'right-axis', bBox: { tag: 'size' },
    });
  });

  it('should pass correct bbox, horizontal-top position', () => {
    setupAxisCoordinates([1, 0]);
    const tree = mount((
      <PluginHost>
        <Axis {...defaultProps} position="top" />
        {pluginDepsToComponents(defaultDeps, getterForAxis('top'))}
      </PluginHost>
    ));

    tree.find(RootComponent).props().onSizeChange({ tag: 'size' });

    expect(defaultDeps.action.changeBBox.mock.calls[0][0]).toEqual({
      placeholder: 'top-axis', bBox: { tag: 'size' },
    });
  });

  it('should pass correct bbox for group, horizontal-bottom position', () => {
    setupAxisCoordinates([1, 0]);
    const tree = mount((
      <PluginHost>
        <Axis {...defaultProps} />
        {pluginDepsToComponents(defaultDeps)}
      </PluginHost>
    ));

    tree.find(RootComponent).props().onSizeChange({ tag: 'size' });

    expect(defaultDeps.action.changeBBox.mock.calls[0][0]).toEqual({
      placeholder: 'bottom-axis', bBox: { tag: 'size' },
    });
  });

  it('should pass axisCoordinates method correct parameters, horizontal orientation', () => {
    const mockTickFormat = () => 0;
    setupAxisCoordinates([1, 0]);
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis
          {...defaultProps}
          tickFormat={mockTickFormat}
        />
      </PluginHost>
    ));

    expect(axisCoordinates).toHaveBeenCalledWith({
      name: 'test-domain',
      scale: mockScale,
      position: 'bottom',
      tickSize: 5,
      tickFormat: mockTickFormat,
      indentFromAxis: 10,
    });
  });

  it('should pass axisCoordinates method correct parameters, vertical orientation', () => {
    setupAxisCoordinates([0, 1]);
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: {
            scales: {
              'other-domain': mockScale,
            },
            layouts: {
              'bottom-axis': {
                width: 250, height: 150,
              },
            },
          },
        })}
        <Axis
          {...defaultProps}
          name="other-domain"
          tickSize={6}
          indentFromAxis={3}
        />
      </PluginHost>
    ));

    expect(axisCoordinates).toHaveBeenCalledWith({
      name: 'other-domain',
      scale: mockScale,
      position: 'bottom',
      tickSize: 6,
      indentFromAxis: 3,
    });
  });

  it('should render tick component', () => {
    setupAxisCoordinates([1, 0]);
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
    setupAxisCoordinates([1, 0]);
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

  it('should render line component, horizontal', () => {
    setupAxisCoordinates([1, 0]);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(LineComponent).props()).toEqual({
      width: 200,
      height: 0,
    });
  });

  it('should render line component, vertical', () => {
    setupAxisCoordinates([0, 1]);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Axis
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(LineComponent).props()).toEqual({
      width: 0,
      height: 100,
    });
  });

  it('should pass axesData correct arguments', () => {
    setupAxisCoordinates([1, 0]);
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
