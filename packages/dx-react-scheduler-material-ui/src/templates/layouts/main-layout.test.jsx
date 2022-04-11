import * as React from 'react';
import { createShallow, createMount } from '@devexpress/dx-testing';
import { MainLayout, classes } from './main-layout';
import { scrollingStrategy } from '../utils';

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  scrollingStrategy: jest.fn(),
}));

describe('Main Layout', () => {
  const defaultProps = {
    timeScaleComponent: () => null,
    dayScaleComponent: () => null,
    timeTableComponent: () => null,
    dayScaleEmptyCellComponent: () => null,
    setScrollingStrategy: jest.fn(),
  };
  let shallow;
  let mount;
  beforeAll(() => {
    shallow = createShallow();
    scrollingStrategy.mockImplementation(() => undefined);
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });

  it('should pass className to the root element', () => {
    const tree = shallow((
      <MainLayout {...defaultProps} className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.container}`))
      .toBeTruthy();
    expect(tree.find(`.${classes.ordinaryHeaderBorder}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.brightHeaderBorder}`).exists())
      .toBeFalsy();
    expect(tree.find(`.${classes.ordinaryLeftPanelBorder}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.brightLeftPanelBorder}`).exists())
      .toBeFalsy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <MainLayout {...defaultProps} data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toMatchObject({ a: 1 });
  });

  it('should call the scrollingStrategy function', () => {
    scrollingStrategy.mockClear();
    mount((
      <MainLayout {...defaultProps} />
    ));

    expect(scrollingStrategy)
      .toBeCalledTimes(1);
  });

  it('should render its components correctly', () => {
    const tree = shallow((
      <MainLayout {...defaultProps} />
    ));

    expect(tree.find(`.${classes.header}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.stickyElement}`))
      .toHaveLength(3);
    expect(tree.find(`.${classes.flexRow}`))
      .toHaveLength(3);
    expect(tree.find(`.${classes.inlineFlex}`))
      .toHaveLength(2);
    expect(tree.find(`.${classes.leftPanel}`))
      .toHaveLength(2);
    expect(tree.find(`.${classes.dayScaleEmptyCell}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.background}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.relativeContainer}`).exists())
      .toBeTruthy();
  });

  it('should have bright border after scroll', () => {
    const tree = mount((
      <MainLayout {...defaultProps} />
    ));

    expect(tree.find(`.${classes.brightHeaderBorder}`).exists())
      .toBeFalsy();
    tree.simulate('scroll', { target: { scrollTop: 5 } });
    tree.update();
    expect(tree.find(`.${classes.brightHeaderBorder}`).exists())
      .toBeTruthy();

    expect(tree.find(`.${classes.brightLeftPanelBorder}`).exists())
      .toBeFalsy();
    tree.simulate('scroll', { target: { scrollLeft: 5 } });
    tree.update();
    expect(tree.find(`.${classes.brightLeftPanelBorder}`).exists())
      .toBeTruthy();
  });

  it('should not render day scale empty cell', () => {
    const tree = shallow((
      <MainLayout {...defaultProps} timeScaleComponent={undefined} />
    ));

    expect(tree.find(`.${classes.dayScaleEmptyCell}`).exists())
      .toBeFalsy();
  });

  it('should not render time scale', () => {
    const tree = shallow((
      <MainLayout {...defaultProps} timeScaleComponent={undefined} />
    ));

    expect(tree.find(`.${classes.leftPanel}`).exists())
      .toBeFalsy();
  });
});
