import * as React from 'react';
import { getClasses, createShallow } from '@material-ui/core/test-utils';
import { VerticalViewLayout } from './vertical-view-layout';

describe('Vertical View Layout', () => {

  const defaultProps = {
    timeScaleComponent: () => null,
    dayScaleComponent: () => null,
    timeTableComponent: () => null,
    dayScaleEmptyCellComponent: () => null,
    layoutRef: React.createRef(),
    layoutHeaderRef: React.createRef(),
    height: 1000,
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<VerticalViewLayout {...defaultProps} />);
    shallow = createShallow();
  });

  it('should pass className to the root element', () => {
    const tree = shallow((
      <VerticalViewLayout {...defaultProps} className="custom-class" />
    ));

    expect(tree.find('.custom-class'))
      .toBeTruthy();
    expect(tree.find(`.${classes.container}`))
      .toBeTruthy();
  });
});
