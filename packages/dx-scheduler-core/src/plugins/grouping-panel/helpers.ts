import { PureComputed } from '@devexpress/dx-core';
import { Resource, Grouping, ResourceInstance } from '../../types';

const filterResourcesByGrouping: PureComputed<
  [Array<Resource>, Array<Grouping>], Array<Resource>
> = (resources, grouping) => resources.filter(
  resource => grouping.find(resourceId => resource.fieldName === resourceId.resourceName),
);

const sortFilteredResources: PureComputed<
  [Array<Resource>, Array<Grouping>], Array<Resource>
> = (resources, grouping) => {
  return grouping.map(({ resourceName }: Grouping) => {
    return resources.find(resource => resource.fieldName === resourceName) as Resource;
  });
};

export const getGroupingItemsFromResources: PureComputed<
  [Array<Resource>, Array<Grouping>], Array<Array<ResourceInstance>>
> = (resources, grouping) => {
  const filteredResources = filterResourcesByGrouping(resources, grouping);
  const sortedResources = sortFilteredResources(filteredResources, grouping);
  return sortedResources.reduce((
    acc: Array<Array<ResourceInstance>>, resource: Resource, index: number,
  ) => {
    if (index === 0) {
      return [resource.instances.map(
        (instance: ResourceInstance) => instance,
      )];
    }
    const result = acc[index - 1].reduce((currentResourceNames: Array<ResourceInstance>) => [
      ...currentResourceNames,
      ...resource.instances.map(
        (instance: ResourceInstance) => instance,
      ),
    ], []);
    return [...acc, result];
  }, []);
};
