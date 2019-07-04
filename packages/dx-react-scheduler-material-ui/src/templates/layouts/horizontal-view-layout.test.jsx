import * as React from 'react';
import { getClasses, createShallow } from '@material-ui/core/test-utils';
import { AUTO_HEIGHT } from '@devexpress/dx-scheduler-core';
import { HorizontalViewLayout } from './horizontal-view-layout';

describe('Horizontal View Layout', () => {
  const defaultProps = {
    dayScaleComponent: () => null,
    timeTableComponent: () => null,
    layoutRef: React.createRef(),
    layoutHeaderRef: React.createRef(),
    height: 1000,
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<HorizontalViewLayout {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });

  it('should pass className to the root element', () => {
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} className="custom-class" />
    ));

    expect(tree.find('.custom-class'))
      .toBeTruthy();
    expect(tree.find(`.${classes.container}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} data={{ a: 1 }} />
    ));

    expect(tree.find(`.${classes.container}`).props().data)
      .toMatchObject({ a: 1 });
  });

  it('should pass style to the root element', () => {
    const containerStyle = defaultProps.height === AUTO_HEIGHT ? { height: '100%' } : { height: `${defaultProps.height}px` };
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} style={{ a: 1 }} />
    ));

    expect(tree.find(`.${classes.container}`).props().style)
      .toMatchObject({ containerStyle, a: 1 });
  });

  it('should replace style of the root element', () => {
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} style={{ height: 1 }} />
    ));

    expect(tree.find(`.${classes.container}`).props().style)
      .toMatchObject({ height: 1 });
  });
});
