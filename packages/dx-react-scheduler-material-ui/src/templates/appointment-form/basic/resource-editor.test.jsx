import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { shallow as enzymeShallow } from 'enzyme';
import MenuItem from '@mui/material/MenuItem';
import { ResourceEditor } from './resource-editor';

/* eslint-disable object-curly-newline */
describe('AppointmentForm resource editor', () => {
  let shallow;
  const defaultProps = {
    onResourceChange: jest.fn(),
    appointmentResources: [{ id: 0, text: 'text-0', title: 'title-0', fieldName: 'location', color: 'red' }],
    resource: {
      fieldName: 'location',
      title: 'title',
      instances: [
        { id: 0, text: 'text-0', title: 'title-0', fieldName: 'location', color: 'red' },
        { id: 1, text: 'text-1', title: 'title-1', fieldName: 'location', color: 'blue' },
      ],
    },
  };
  beforeAll(() => {
    shallow = createShallow();
  });

  describe('ResourceEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <ResourceEditor {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should pass className to the root element', () => {
      const tree = shallow((
        <ResourceEditor className="custom-class" {...defaultProps} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
    it('should handle change', () => {
      const tree = shallow((
        <ResourceEditor {...defaultProps} />
      ));

      tree.simulate('change', { target: { value: 'next' } });

      expect(defaultProps.onResourceChange)
        .toBeCalledWith({ location: 'next' });
    });
    it('should render instances depending on resource instances', () => {
      const tree = shallow((
        <ResourceEditor {...defaultProps} />
      ));
      const tree1 = enzymeShallow(<ResourceEditor {...defaultProps} />);
      expect(tree1.find(MenuItem))
        .toHaveLength(2);
      expect(tree.find(MenuItem))
        .toHaveLength(2);
    });
    it('should be disabled depending on readonly', () => {
      const tree = shallow((
        <ResourceEditor
          {...defaultProps}
          readOnly
        />
      ));

      expect(tree.prop('disabled'))
        .toBeTruthy();
    });
  });
});
