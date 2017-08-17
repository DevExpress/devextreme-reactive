import { shallowEqual, argumentsShallowEqual } from './shallow-equal';

describe('ShallowEqual utils', () => {
  describe('#shallowEqual', () => {
    it('should return "true" if objects are equal by reference', () => {
      const obj1 = {};
      const obj2 = obj1;

      expect(shallowEqual(obj1, obj2))
        .toBeTruthy();
    });

    it('should return "true" if object fields are equal', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 2 };

      expect(shallowEqual(obj1, obj2))
        .toBeTruthy();
    });

    it('should return "false" if objects are different', () => {
      const obj1 = { a: 3 };
      const obj2 = { a: 1 };
      const obj3 = { a: 3, b: 1 };

      expect(shallowEqual(obj1, obj2))
        .toBeFalsy();
      expect(shallowEqual(obj1, obj3))
        .toBeFalsy();
    });
  });

  describe('#argumentsShallowEqual', () => {
    it('should return "true" only if arguments are equal', () => {
      expect(argumentsShallowEqual(null, []))
        .toBeFalsy();
      expect(argumentsShallowEqual([], null))
        .toBeFalsy();
      expect(argumentsShallowEqual([], [1]))
        .toBeFalsy();
      expect(argumentsShallowEqual([1], [2]))
        .toBeFalsy();
      expect(argumentsShallowEqual([1, 2], [1, 2]))
        .toBeTruthy();
    });
  });
});
