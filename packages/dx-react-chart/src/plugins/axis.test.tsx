import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { getTickCoordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { Axis } from './axis';

jest.mock('@devexpress/dx-chart-core', () => ({
  getRotatedPosition: jest.fn(pos => `${pos}-rotated`),
  isValidPosition: jest.fn(pos => !pos.endsWith('-rotated')),
  getTickCoordinates: jest.fn(),
  LEFT: 'left',
  BOTTOM: 'bottom',
}));

describe('Axis', () => {
  const mockScale = jest.fn() as any;
  mockScale.copy = jest.fn().mockReturnValue(mockScale);
  mockScale.range = jest.fn(arg => (arg === undefined ? [1, 2] : mockScale));

  const RootComponent = ({ children }) => (
    <div>
      {children}
    </div>
  );
  const TickComponent = () => null;
  const LabelComponent = () => null;
  const LineComponent = () => null;
  const GridComponent = () => null;

  const defaultDeps = {
    getter: {
      scales: {
        'test-domain': mockScale,
        'other-domain': mockScale,
      },
      layouts: {
        'top-axis-test-domain': { width: 150, height: 100 },
        'bottom-axis-test-domain': { width: 200, height: 150 },
        'left-axis-test-domain': { width: 250, height: 200 },
        'right-axis-test-domain': { width: 300, height: 250 },
        pane: { width: 400, height: 500 },
      },
      rotated: false,
    },
    action: {
      changeBBox: jest.fn(),
    },
    template: {
      'top-axis': {},
      'bottom-axis': {},
      'left-axis': {},
      'right-axis': {},
      series: {},
    },
  };

  const defaultProps = {
    position: 'bottom',
    scaleName: 'test-domain',
    showTicks: true,
    showGrid: true,
    showLine: true,
    showLabels: true,
    rootComponent: RootComponent,
    tickComponent: TickComponent,
    labelComponent: LabelComponent,
    lineComponent: LineComponent,
    gridComponent: GridComponent,
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
      dy: 'dy1',
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
      dy: 'dy2',
      textAnchor: 'textAnchor2',
      key: '2',
    },
  ];

  (getTickCoordinates as jest.Mock).mockReturnValue({
    ticks: [{
      key: '1',
      x1: 11,
      y1: 12,
    }, {
      key: '2',
      x1: 21,
      y1: 22,
    }],
    sides: [0, 1],
  });

  const setupGetTickCoordinates = (sides) => {
    (getTickCoordinates as jest.Mock).mockReturnValue({ sides, ticks: mockTicks });
  };

  const enforceUpdate = tree => tree.setProps({ tag: 'enforce-update' }).update();

  const getDivStyle = tree => tree.findWhere(node => (
    node.type() === 'div' && node.prop('style') && node.prop('style').position === 'relative'
  )).prop('style');

  let originalGetBoundingClientRect;
  const getBoundingClientRect = jest.fn();

  beforeAll(() => {
    originalGetBoundingClientRect = (global as any).HTMLDivElement.prototype.getBoundingClientRect;
    (global as any).HTMLDivElement.prototype.getBoundingClientRect = getBoundingClientRect;
  });

  afterAll(() => {
    (global as any).HTMLDivElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  beforeEach(() => {
    setupGetTickCoordinates([1, 0]);
    getBoundingClientRect.mockReturnValue({ width: 400, height: 300 });
  });

  afterEach(() => {
    jest.clearAllMocks();
    (getTickCoordinates as jest.Mock).mockReset();
    getBoundingClientRect.mockReset();
  });

  const AxisTester = props => (
    <PluginHost>
      {pluginDepsToComponents(defaultDeps)}
      <Axis {...defaultProps} {...props} />
    </PluginHost>
  );

  it('should render root component', () => {
    const tree = mount(<AxisTester />);

    expect(tree.find(RootComponent).props()).toEqual({
      dx: 1,
      dy: 0,
      onSizeChange: expect.any(Function),
      children: expect.anything(),
    });
  });

  it('should pass correct bbox, vertical-left position', () => {
    setupGetTickCoordinates([0, 1]);
    const tree = mount(<AxisTester position="left" />);

    (tree.find(RootComponent).props() as any).onSizeChange({ width: 350, height: 250 });

    expect(defaultDeps.action.changeBBox.mock.calls[0][0]).toEqual({
      placeholder: 'left-axis-test-domain', bBox: { width: 350, height: 250 },
    });

    enforceUpdate(tree);

    expect(getDivStyle(tree)).toEqual({ position: 'relative', width: 250 });
    expect(tree.find('svg').props()).toMatchObject({ width: 350, height: 300 });
  });

  it('should pass correct bbox, vertical-right position', () => {
    setupGetTickCoordinates([0, 1]);
    const tree = mount(<AxisTester position="right" />);

    (tree.find(RootComponent).props() as any).onSizeChange({ width: 350, height: 250 });

    expect(defaultDeps.action.changeBBox.mock.calls[0][0]).toEqual({
      placeholder: 'right-axis-test-domain', bBox: { width: 350, height: 250 },
    });

    enforceUpdate(tree);

    expect(getDivStyle(tree)).toEqual({ position: 'relative', width: 300 });
    expect(tree.find('svg').props()).toMatchObject({ width: 350, height: 300 });
  });

  it('should pass correct bbox, horizontal-top position', () => {
    setupGetTickCoordinates([1, 0]);
    const tree = mount(<AxisTester position="top" />);

    (tree.find(RootComponent).props() as any).onSizeChange({ width: 350, height: 250 });

    expect(defaultDeps.action.changeBBox.mock.calls[0][0]).toEqual({
      placeholder: 'top-axis-test-domain', bBox: { width: 350, height: 250 },
    });

    enforceUpdate(tree);

    expect(getDivStyle(tree)).toEqual({ position: 'relative', height: 100, flexGrow: 1 });
    expect(tree.find('svg').props()).toMatchObject({ width: 400, height: 250 });
  });

  it('should pass correct bbox for group, horizontal-bottom position', () => {
    setupGetTickCoordinates([1, 0]);
    const tree = mount(<AxisTester />);

    (tree.find(RootComponent).props() as any).onSizeChange({ width: 350, height: 250 });

    expect(defaultDeps.action.changeBBox.mock.calls[0][0]).toEqual({
      placeholder: 'bottom-axis-test-domain', bBox: { width: 350, height: 250 },
    });

    enforceUpdate(tree);

    expect(getDivStyle(tree)).toEqual({ position: 'relative', height: 150, flexGrow: 1 });
    expect(tree.find('svg').props()).toMatchObject({ width: 400, height: 250 });
  });

  it('should call changeBBox one time, zises are not changed after update', () => {
    setupGetTickCoordinates([0, 1]);
    const tree = mount(<AxisTester position="left" />);

    const { onSizeChange } = tree.find(RootComponent).props() as any;

    onSizeChange({ width: 300, height: 200 });
    onSizeChange({ width: 300, height: 200 });

    expect(defaultDeps.action.changeBBox.mock.calls.length).toBe(1);
  });

  it('should pass getTickCoordinates method correct parameters, horizontal orientation', () => {
    const mockTickFormat = () => 0;
    setupGetTickCoordinates([1, 0]);
    mount(<AxisTester tickFormat={mockTickFormat} />);

    expect(getTickCoordinates).toHaveBeenCalledWith({
      scaleName: 'test-domain',
      scale: mockScale,
      position: 'bottom',
      tickSize: 5,
      tickFormat: mockTickFormat,
      indentFromAxis: 10,
      paneSize: [400, 500],
      rotated: false,
    });
  });

  it('should pass getTickCoordinates method correct parameters, vertical orientation', () => {
    setupGetTickCoordinates([0, 1]);
    mount(
      <AxisTester
        scaleName="other-domain"
        tickSize={6}
        indentFromAxis={3}
      />,
    );

    expect(getTickCoordinates).toHaveBeenCalledWith({
      scaleName: 'other-domain',
      scale: mockScale,
      position: 'bottom',
      tickSize: 6,
      indentFromAxis: 3,
      paneSize: [400, 500],
      rotated: false,
    });
  });

  it('should pass getTickCoordinates method correct parameters, horizontal, rotated', () => {
    setupGetTickCoordinates([1, 0]);
    mount(
    <PluginHost>
      {pluginDepsToComponents({
        ...defaultDeps,
        getter: { ...defaultDeps.getter, rotated: true },
      })}
      <Axis {...defaultProps as any} />
    </PluginHost>,
    );

    expect(getTickCoordinates).toHaveBeenCalledWith({
      scaleName: 'test-domain',
      scale: mockScale,
      position: 'bottom',
      tickSize: 5,
      indentFromAxis: 10,
      paneSize: [400, 500],
      rotated: true,
    });
  });

  it('should render tick component', () => {
    setupGetTickCoordinates([1, 0]);
    const tree = mount(<AxisTester />);

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

  it('should not render tick component, showTicks is false', () => {
    setupGetTickCoordinates([1, 0]);
    const tree = mount(<AxisTester showTicks={false} />);

    expect(tree.find(TickComponent).get(0)).toBeFalsy();
  });

  it('should render grid component', () => {
    setupGetTickCoordinates([1, 0]);
    const tree = mount(<AxisTester />);

    expect(tree.find(GridComponent).get(0).props).toEqual({
      x1: 1,
      x2: 1,
      y1: 3,
      y2: 503,
    });
    expect(tree.find(GridComponent).get(1).props).toEqual({
      x1: 11,
      x2: 11,
      y1: 33,
      y2: 533,
    });
  });

  it('should not render grid component, showGrid is false', () => {
    setupGetTickCoordinates([1, 0]);
    const tree = mount(<AxisTester showGrid={false} />);

    expect(tree.find(GridComponent).get(0)).toBeFalsy();
  });

  it('should render label component', () => {
    setupGetTickCoordinates([1, 0]);
    const tree = mount(<AxisTester />);

    expect(tree.find(LabelComponent).get(0).props).toEqual({
      x: 'xText1',
      y: 'yText1',
      dy: 'dy1',
      textAnchor: 'textAnchor1',
      text: 'text1',
    });

    expect(tree.find(LabelComponent).get(1).props).toEqual({
      x: 'xText2',
      y: 'yText2',
      dy: 'dy2',
      textAnchor: 'textAnchor2',
      text: 'text2',
    });
  });

  it('should not render label component, showLabels is false', () => {
    setupGetTickCoordinates([1, 0]);
    const tree = mount(<AxisTester showLabels={false} />);

    expect(tree.find(LabelComponent).get(0)).toBeFalsy();
  });

  it('should render line component, horizontal', () => {
    setupGetTickCoordinates([1, 0]);
    const tree = mount(<AxisTester />);

    (tree.find(RootComponent).props() as any).onSizeChange({ width: 350, height: 250 });
    enforceUpdate(tree);

    expect(tree.find(LineComponent).props()).toEqual({
      x1: 0,
      x2: 400,
      y1: 0,
      y2: 0,
    });
  });

  it('should render line component, vertical', () => {
    setupGetTickCoordinates([0, 1]);
    const tree = mount(<AxisTester />);

    (tree.find(RootComponent).props() as any).onSizeChange({ width: 350, height: 250 });
    enforceUpdate(tree);

    expect(tree.find(LineComponent).props()).toEqual({
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 500,
    });
  });

  it('should not render line component, showLine is false', () => {
    setupGetTickCoordinates([1, 0]);
    const tree = mount(<AxisTester showLine={false} />);

    expect(tree.find(LineComponent).get(0)).toBeFalsy();
  });
});
