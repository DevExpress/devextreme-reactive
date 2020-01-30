import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { MainLayout } from './main-layout';
import { scrollingStrategy } from '../utils';

jest.mock('../utils', () => ({
  ...require.requireActual('../utils'),
  scrollingStrategy: jest.fn(),
}));
jest.mock('@material-ui/core/styles', () => ({
  ...require.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    container: 'container',
    stickyElement: 'stickyElement',
    header: 'header',
    leftPanel: 'leftPanel',
    timeTable: 'timeTable',
    mainTable: 'mainTable',
    fullScreenContainer: 'fullScreenContainer',
    autoWidth: 'autoWidth',
    background: 'background',
    ordinaryLeftPanelBorder: 'ordinaryLeftPanelBorder',
    brightLeftPanelBorder: 'brightLeftPanelBorder',
    ordinaryHeaderBorder: 'ordinaryHeaderBorder',
    brightHeaderBorder: 'brightHeaderBorder',
    timeScale: 'timeScale',
    dayScaleEmptyCell: 'dayScaleEmptyCell',
    fullWidthTable: 'fullWidthTable',
    leftPanelWithoutTimeScale: 'leftPanelWithoutTimeScale',
    mainTableWithoutTimeScale: 'mainTableWithoutTimeScale',
  })),
}));

describe('Vertical View Layout', () => {
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
    expect(tree.is('.container'))
      .toBeTruthy();
    expect(tree.find('.ordinaryHeaderBorder').exists())
      .toBeTruthy();
    expect(tree.find('s.brightHeaderBorder').exists())
      .toBeFalsy();
    expect(tree.find('.ordinaryLeftPanelBorder').exists())
      .toBeTruthy();
    expect(tree.find('.brightLeftPanelBorder').exists())
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

    expect(tree.find('.header').exists())
      .toBeTruthy();
    expect(tree.find('.stickyElement'))
      .toHaveLength(3);
    expect(tree.find('.autoWidth'))
      .toHaveLength(2);
    expect(tree.find('.leftPanel'))
      .toHaveLength(2);
    expect(tree.find('.dayScaleEmptyCell').exists())
      .toBeTruthy();
    expect(tree.find('.fullScreenContainer'))
      .toHaveLength(2);
    expect(tree.find('.background').exists())
      .toBeTruthy();
    expect(tree.find('.mainTable'))
      .toHaveLength(2);
    expect(tree.find('.timeScale').exists())
      .toBeTruthy();
    expect(tree.find('.timeTable').exists())
      .toBeTruthy();
  });

  it('should have bright border after scroll', () => {
    const tree = mount((
      <MainLayout {...defaultProps} />
    ));

    tree.simulate('scroll', { target: { scrollTop: 5 } });
    tree.update();
    expect(tree.find('.brightHeaderBorder').exists())
      .toBeTruthy();

    tree.simulate('scroll', { target: { scrollLeft: 5 } });
    tree.update();
    expect(tree.find('.brightLeftPanelBorder').exists())
      .toBeTruthy();
  });

  it('should not render day scale empty cell', () => {
    const tree = shallow((
      <MainLayout {...defaultProps} timeScaleComponent={undefined} />
    ));

    expect(tree.find('.dayScaleEmptyCell').exists())
      .toBeFalsy();
  });

  it('should not render time scale', () => {
    const tree = shallow((
      <MainLayout {...defaultProps} timeScaleComponent={undefined} />
    ));

    expect(tree.find('.timeScale').exists())
      .toBeFalsy();
    expect(tree.find('.mainTableWithoutTimeScale'))
      .toHaveLength(2);
    expect(tree.find('.leftPanelWithoutTimeScale'))
      .toHaveLength(1);
  });
});
