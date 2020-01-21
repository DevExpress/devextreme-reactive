import * as React from 'react';
import { getClasses, createShallow } from '@material-ui/core/test-utils';
import { HorizontalViewLayout } from './horizontal-view-layout';
import { scrollingStrategy } from '../utils';

jest.mock('../utils', () => ({
  ...require.requireActual('../utils'),
  scrollingStrategy: jest.fn(),
}));

describe('Horizontal View Layout', () => {
  const defaultProps = {
    dayScaleComponent: () => null,
    timeTableComponent: () => null,
    setScrollingStrategy: jest.fn(),
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<HorizontalViewLayout {...defaultProps} />);
    shallow = createShallow({ dive: true });
    scrollingStrategy.mockImplementation(() => undefined);
  });

  it('should pass className to the root element', () => {
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} className="custom-class" />
    ));

    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
    expect(tree.hasClass(`${classes.container}`))
      .toBeTruthy();
    expect(tree.find(`.${classes.stickyHeader}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.timeTable}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.ordinaryHeaderBorder}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.brightHeaderBorder}`).exists())
      .toBeFalsy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toMatchObject({ a: 1 });
  });

  it('should call the scrollingStrategy function', () => {
    scrollingStrategy.mockClear();
    shallow((
      <HorizontalViewLayout {...defaultProps} />
    ));

    expect(scrollingStrategy)
      .toBeCalledTimes(1);
  });

  it('should render its components correctly', () => {
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} />
    ));

    expect(tree.find(`.${classes.stickyHeader}`).exists())
      .toBeTruthy();
    expect(tree.find(`.${classes.timeTable}`).exists())
      .toBeTruthy();
  });

  it('should have bright border after scroll', () => {
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} />
    ));

    tree.simulate('scroll', { target: { scrollTop: 5 } });
    tree.update();

    expect(tree.find(`.${classes.brightHeaderBorder}`).exists())
      .toBeTruthy();
  });
});
