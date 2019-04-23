import { nextPageReferenceIndex } from './computeds';
import { pageTriggersMeta } from './helpers';

jest.mock('./helpers', () => ({
  ...require.requireActual('./helpers'),
  pageTriggersMeta: jest.fn(),
}));

describe('#nextPageReferenceIndex', () => {
  afterEach(jest.resetAllMocks);

  const getters = {};
  const defaultPayload = {
    viewportTop: 0,
    estimatedRowHeight: 40,
    containerHeight: 400,
  };

  it('should calculate page triggers', () => {
    pageTriggersMeta.mockImplementationOnce(() => null);
    const payload = {};

    nextPageReferenceIndex(payload, getters);

    expect(pageTriggersMeta)
      .toHaveBeenCalledWith(payload, getters);
  });

  it('should return null if pageTriggers not exist', () => {
    pageTriggersMeta.mockImplementationOnce(() => null);

    expect(nextPageReferenceIndex(defaultPayload, getters))
      .toBeNull();
  });

  it('should return null if none of page trigger is reached', () => {
    const payload = {
      ...defaultPayload,
      viewportTop: 5000,
    };
    pageTriggersMeta.mockImplementationOnce(() => ({
      topTriggerIndex: 100,
      topTriggerPosition: 3800,
      bottomTriggerIndex: 200,
      bottomTriggerPosition: 7800,
    }));

    expect(nextPageReferenceIndex(payload, getters))
      .toBeNull();
  });

  it('should calculate reference index for previous page', () => {
    const payload = {
      ...defaultPayload,
      viewportTop: 3000,
    };
    pageTriggersMeta.mockImplementationOnce(() => ({
      topTriggerIndex: 100,
      topTriggerPosition: 3800,
      bottomTriggerIndex: 200,
      bottomTriggerPosition: 7800,
    }));

    expect(nextPageReferenceIndex(payload, getters))
      .toBe(85);
  });

  it('should calculate reference index for next page', () => {
    const payload = {
      ...defaultPayload,
      viewportTop: 8000,
    };
    pageTriggersMeta.mockImplementationOnce(() => ({
      topTriggerIndex: 100,
      topTriggerPosition: 3800,
      bottomTriggerIndex: 200,
      bottomTriggerPosition: 7800,
    }));

    expect(nextPageReferenceIndex(payload, getters))
      .toBe(210);
  });

  it('should calculate reference index for arbitary page', () => {
    const payload = {
      ...defaultPayload,
      viewportTop: 90000,
    };
    pageTriggersMeta.mockImplementationOnce(() => ({
      topTriggerIndex: 100,
      topTriggerPosition: 3800,
      bottomTriggerIndex: 200,
      bottomTriggerPosition: 7800,
    }));

    expect(nextPageReferenceIndex(payload, getters))
      .toBe(2260);
  });
});
