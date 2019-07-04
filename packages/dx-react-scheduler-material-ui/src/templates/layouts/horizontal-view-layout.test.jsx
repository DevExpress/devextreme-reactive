import * as React from 'react';
import { getClasses, createShallow } from '@material-ui/core/test-utils';
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

    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
    expect(tree.hasClass(`${classes.container}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toMatchObject({ a: 1 });
  });

  it('should pass style to the root element', () => {
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} style={{ a: 1 }} />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ height: '1000px', a: 1 });
  });

  it('should replace style of the root element', () => {
    const tree = shallow((
      <HorizontalViewLayout {...defaultProps} style={{ height: 1 }} />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ height: 1 });
  });
});
