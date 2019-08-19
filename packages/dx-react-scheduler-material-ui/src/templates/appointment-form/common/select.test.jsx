import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import { Select } from './select';
import { OUTLINED_SELECT } from '@devexpress/dx-scheduler-core';

describe('AppointmentForm common', () => {
  const defaultProps = {
    onChange: jest.fn(),
    value: '1',
  };
  let shallow;
  let mount;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });

  describe('Select', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Select {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should handle change', () => {
      const tree = shallow((
        <Select {...defaultProps} />
      ));

      tree.simulate('change', { target: { value: 'next' } });

      expect(defaultProps.onChange)
        .toBeCalledWith('next');
    });

    it('should render items depending on available options', () => {
      const tree = shallow((
        <Select
          {...defaultProps}
          availableOptions={[
            { text: '1', id: 1 },
            { text: '2', id: 2 },
            { text: '3', id: 3 },
          ]}
        />
      ));

      expect(tree.find(MenuItem))
        .toHaveLength(3);
    });

    it('should render standard select', () => {
      const tree = mount((
        <Select
          {...defaultProps}
        />
      ));

      expect(tree.find(FilledInput))
        .toHaveLength(1);
      expect(tree.find(OutlinedInput))
        .toHaveLength(0);
    });

    it('should render outlined select', () => {
      const tree = mount((
        <Select
          {...defaultProps}
          id={OUTLINED_SELECT}
        />
      ));

      expect(tree.find(FilledInput))
        .toHaveLength(0);
      expect(tree.find(OutlinedInput))
        .toHaveLength(1);
    });
  });
});
