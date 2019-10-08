import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('Vertical view TimePanel', () => {
  let shallow;
  const defaultProps = {
    cellsData: [
      [
        { startDate: new Date(2018, 6, 7, 16), endDate: new Date(2018, 6, 7, 18) },
        { startDate: new Date(2018, 6, 8, 16), endDate: new Date(2018, 6, 8, 18) },
      ],
      [
        { startDate: new Date(2018, 6, 7, 18), endDate: new Date(2018, 6, 7, 20) },
        { startDate: new Date(2018, 6, 8, 18), endDate: new Date(2018, 6, 7, 20) },
      ],
    ],
    labelComponent: () => undefined,
    formatDate: () => undefined,
  };
  beforeAll(() => {
    shallow = createShallow();
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render array of days', () => {
      const label = () => <div />;
      /* eslint-disable-next-line */
      const tree = shallow((
        <Layout
          {...defaultProps}
          labelComponent={label}
        />
      ));

      expect(tree.find(label))
        .toHaveLength(3);
    });
  });
});
