import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { MainLayout } from './main-layout';
import { scrollingStrategy } from '../utils';

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  scrollingStrategy: jest.fn(),
}));
jest.mock('@material-ui/core/styles', () => ({
  ...jest.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    container: 'container',
    stickyElement: 'stickyElement',
    header: 'header',
    leftPanel: 'leftPanel',
    flexRow: 'flexRow',
    inlineFlex: 'inlineFlex',
    background: 'background',
    ordinaryLeftPanelBorder: 'ordinaryLeftPanelBorder',
    brightLeftPanelBorder: 'brightLeftPanelBorder',
    ordinaryHeaderBorder: 'ordinaryHeaderBorder',
    brightHeaderBorder: 'brightHeaderBorder',
    timeScale: 'timeScale',
    dayScaleEmptyCell: 'dayScaleEmptyCell',
    relativeContainer: 'relativeContainer',
  })),
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
    expect(tree.is('.container'))
      .toBeTruthy();
    expect(tree.find('.ordinaryHeaderBorder').exists())
      .toBeTruthy();
    expect(tree.find('.brightHeaderBorder').exists())
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
    expect(tree.find('.flexRow'))
      .toHaveLength(3);
    expect(tree.find('.inlineFlex'))
      .toHaveLength(2);
    expect(tree.find('.leftPanel'))
      .toHaveLength(2);
    expect(tree.find('.dayScaleEmptyCell').exists())
      .toBeTruthy();
    expect(tree.find('.background').exists())
      .toBeTruthy();
    expect(tree.find('.relativeContainer').exists())
      .toBeTruthy();
  });

  it('should have bright border after scroll', () => {
    const tree = mount((
      <MainLayout {...defaultProps} />
    ));

    expect(tree.find('.brightHeaderBorder').exists())
      .toBeFalsy();
    tree.simulate('scroll', { target: { scrollTop: 5 } });
    tree.update();
    expect(tree.find('.brightHeaderBorder').exists())
      .toBeTruthy();

    expect(tree.find('.brightLeftPanelBorder').exists())
      .toBeFalsy();
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

    expect(tree.find('.leftPanel').exists())
      .toBeFalsy();
  });
});
