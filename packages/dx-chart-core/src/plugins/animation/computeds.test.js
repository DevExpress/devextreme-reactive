import {
  getAnimation,
} from './computeds';

describe('#getAnimation', () => {
  it('should return proper styles, without userSettings', () => {
    expect(getAnimation()({ x: 1, y: 2 }, { name: 'animation_1', options: () => 'options' })()).toEqual({
      animation: 'animation_1 options',
    });
  });

  it('should return proper styles, with userSettings', () => {
    expect(getAnimation(() => 'userSettings')({ x: 1, y: 2 }, { name: 'animation_1', options: () => 'options' })()).toEqual({
      animation: 'animation_1 userSettings',
    });
  });
});
