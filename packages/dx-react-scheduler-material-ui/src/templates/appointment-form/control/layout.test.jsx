import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { StaticArea } from './static-area';

describe('AppointmentForm', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<StaticArea><div /></StaticArea>);
    shallow = createShallow({ dive: true });
  });
  describe('StaticArea', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <StaticArea data={{ a: 1 }}>
          <div />
        </StaticArea>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <StaticArea className="custom-class">
          <div />
        </StaticArea>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });
  });
});
