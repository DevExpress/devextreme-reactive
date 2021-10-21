import * as React from 'react';
import { createShallow, createMount } from '@devexpress/dx-testing';
import { OUTLINED_SELECT } from '@devexpress/dx-scheduler-core';
import { Select } from './select';
import { FilledSelect } from './filled-select';
import { OutlinedSelect } from './outlined-select';

describe('AppointmentForm common select', () => {
  const defaultProps = {
    onValueChange: jest.fn(),
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

      tree.simulate('valueChange', { target: { value: 'next' } });

      expect(defaultProps.onValueChange)
        .toBeCalledWith({ target: { value: 'next' } });
    });

    it('should should pass all props except type', () => {
      const tree = shallow((
        <Select {...defaultProps} availableOptions={[]} readOnly type={OUTLINED_SELECT} />
      ));

      expect(tree.props())
        .toMatchObject({
          value: defaultProps.value,
          onValueChange: defaultProps.onValueChange,
          availableOptions: [],
          readOnly: true,
        });
      expect(tree.prop('type'))
        .toEqual(undefined);
    });

    it('should render standard select', () => {
      const tree = mount((
        <Select
          {...defaultProps}
        />
      ));

      expect(tree.find(FilledSelect))
        .toHaveLength(1);
    });

    it('should render outlined select', () => {
      const tree = mount((
        <Select
          {...defaultProps}
          type={OUTLINED_SELECT}
        />
      ));

      expect(tree.find(OutlinedSelect))
        .toHaveLength(1);
    });
  });
});
