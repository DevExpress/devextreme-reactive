import React from 'react';
import { mount } from 'enzyme';

import {
  childrenByType,
  extractTemplates,
  combineTemplates,
} from './templateHelpers';

describe('templateHelpers', () => {
  test('childrenByType', () => {
    const TestChild1 = () => null;
    const TestChild2 = () => null;
    const TestChild3 = () => null;
    const Test = ({ children }) => {
      expect(childrenByType(children, TestChild1)).toHaveLength(1);
      expect(childrenByType(children, TestChild2)).toHaveLength(2);
      expect(childrenByType(children, TestChild3)).toHaveLength(0);
      return null;
    };

    mount(
      <Test>
        <TestChild1 />
        <TestChild2 />
        <TestChild2 />
      </Test>,
    );

    expect.assertions(3);
  });

  test('extractTemplates', () => {
    const TestChild1 = () => null;
    const Test = ({ children }) => {
      expect(extractTemplates(children, TestChild1)[0])
        .toMatchObject({
          predicate: 'a',
          template: {
            type: 'div',
          },
        });

      return null;
    };

    mount(
      <Test>
        <TestChild1 predicate="a">
          <div />
        </TestChild1>
      </Test>,
    );

    expect.assertions(1);
  });

  test('combineTemplates', () => {
    const candidates = [
      {
        predicate: params => params === 0,
        template: () => 'a',
      },
      {
        predicate: params => params === 1,
        template: () => 'b',
      },
    ];
    const defaultTemplate = () => 'd';

    let template = combineTemplates(candidates, defaultTemplate);
    expect(template(0)).toBe('a');
    expect(template(1)).toBe('b');
    expect(template(2)).toBe('d');

    candidates.push({
      template: () => 'c',
    });
    template = combineTemplates(candidates, defaultTemplate);
    expect(template(2)).toBe('c');
  });
});
