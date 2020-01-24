import * as React from 'react';
import { getClasses, createShallow } from '@material-ui/core/test-utils';
import { VerticalViewLayout } from './vertical-view-layout';
import { scrollingStrategy } from '../utils';

jest.mock('../utils', () => ({
  ...require.requireActual('../utils'),
  scrollingStrategy: jest.fn(),
}));

describe('Vertical View Layout', () => {
  const defaultProps = {
    timeScaleComponent: () => null,
    dayScaleComponent: () => null,
    timeTableComponent: () => null,
    dayScaleEmptyCellComponent: () => null,
    setScrollingStrategy: jest.fn(),
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<VerticalViewLayout {...defaultProps} />);
    shallow = createShallow({ dive: true });
    scrollingStrategy.mockImplementation(() => undefined);
  });

  it('should pass className to the root element', () => {
    const tree = shallow((
      <VerticalViewLayout {...defaultProps} className="custom-class" />
    ));

    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
    expect(tree.hasClass(`${classes.container}`))
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
      <VerticalViewLayout {...defaultProps} data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toMatchObject({ a: 1 });
  });

  it('should call the scrollingStrategy function', () => {
    scrollingStrategy.mockClear();
    shallow((
      <VerticalViewLayout {...defaultProps} />
    ));

    expect(scrollingStrategy)
      .toBeCalledTimes(1);
  });

  it('should render its components correctly', () => {
    const tree = shallow((
      <VerticalViewLayout {...defaultProps} />
    ));

    expect(tree.find(`.${classes.header}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.mainTable}`))
      .toHaveLength(2);
    expect(tree.find(`.${classes.fixedWidth}`))
      .toHaveLength(2);
    expect(tree.find(`.${classes.timeTable}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.leftPanel}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.background}`).exists())
      .toBeTruthy();
  });

  it('should have bright border after scroll', () => {
    const tree = shallow((
      <VerticalViewLayout {...defaultProps} />
    ));

    tree.simulate('scroll', { target: { scrollTop: 5 } });
    tree.update();
    expect(tree.find(`.${classes.brightHeaderBorder}`).exists())
      .toBeTruthy();

    tree.simulate('scroll', { target: { scrollLeft: 5 } });
    tree.update();
    expect(tree.find(`.${classes.brightLeftPanelBorder}`).exists())
      .toBeTruthy();
  });
});
