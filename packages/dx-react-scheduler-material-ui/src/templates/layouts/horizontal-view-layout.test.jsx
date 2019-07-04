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
    shallow = createShallow();
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
});
