import * as React from 'react';
import { createShallow, getClasses, createMount } from '@devexpress/dx-testing';
import {
  NUMBER_EDITOR,
  TITLE_TEXT_EDITOR,
  MULTILINE_TEXT_EDITOR,
} from '@devexpress/dx-scheduler-core';
import { TextEditor } from './text-editor';

describe('AppointmentForm common', () => {
  const defaultProps = {
    onChange: jest.fn(),
  };
  let shallow;
  let mount;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TextEditor {...defaultProps} />);
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('TextEditor', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <TextEditor className="custom-class" {...defaultProps} />
      ));

      expect(tree.is(`.${classes.editor}.custom-class`))
        .toBeTruthy();
    });

    it('should pass rest props into the root element', () => {
      const tree = shallow((
        <TextEditor data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass InputProps correctly', () => {
      let tree = shallow((
        <TextEditor {...defaultProps} />
      ));
      expect(tree.find(`.${classes.title}`).exists())
        .toBeFalsy();

      tree = shallow((
        <TextEditor type={NUMBER_EDITOR} {...defaultProps} />
      ));
      expect(tree.find(`.${classes.title}`).exists())
        .toBeFalsy();

      tree = shallow((
        <TextEditor type={MULTILINE_TEXT_EDITOR} {...defaultProps} />
      ));
      expect(tree.find(`.${classes.title}`).exists())
        .toBeFalsy();

      tree = mount((
        <TextEditor type={TITLE_TEXT_EDITOR} {...defaultProps} />
      ));
      expect(tree.find(`.${classes.title}`).exists())
        .toBeTruthy();
    });

    it('should render ordinary editor correctly', () => {
      const tree = shallow((
        <TextEditor {...defaultProps} />
      ));

      expect(tree.prop('variant'))
        .toBe('filled');
      expect(tree.prop('multiline'))
        .toBeFalsy();
      expect(tree.prop('type'))
        .toEqual('text');
    });

    it('should render number editor correctly', () => {
      const tree = shallow((
        <TextEditor type={NUMBER_EDITOR} {...defaultProps} />
      ));

      expect(tree.prop('variant'))
        .toBe('filled');
      expect(tree.prop('multiline'))
        .toBeFalsy();
      expect(tree.prop('type'))
        .toEqual('number');
    });

    it('should render multiline editor correctly', () => {
      const tree = shallow((
        <TextEditor type={MULTILINE_TEXT_EDITOR} {...defaultProps} />
      ));

      expect(tree.prop('variant'))
        .toBe('outlined');
      expect(tree.prop('multiline'))
        .toBeTruthy();
    });

    it('should render title editor correctly', () => {
      const tree = shallow((
        <TextEditor type={TITLE_TEXT_EDITOR} {...defaultProps} />
      ));

      expect(tree.prop('variant'))
        .toBe('filled');
      expect(tree.prop('multiline'))
        .toBeFalsy();
      expect(tree.prop('type'))
        .toEqual('text');
    });

    it('should call onChange with proper parameter', () => {
      const tree = shallow((
        <TextEditor {...defaultProps} />
      ));

      tree.simulate('change', 'abc');
      expect(defaultProps.onChange)
        .toBeCalledWith('abc');
    });

    it('should be disabled depending on readonly', () => {
      const tree = shallow((
        <TextEditor
          readOnly
        />
      ));

      expect(tree.prop('disabled'))
        .toBeTruthy();
    });
  });
});
