import { GetAppointmentResources, ValidResourceInstance, ValidResource } from '../../types';
import { PureComputed } from '@devexpress/dx-core';

export const getAppointmentResources: GetAppointmentResources = (
  appointment, resources, plainResources,
) => {
  if (
    !resources || resources.length === 0
    || !plainResources || plainResources.length === 0
  ) return [];

  return resources.reduce((acc, resource) => {
    const appointmentResourceId = appointment[resource.fieldName];
    if (appointmentResourceId === undefined) return acc;

    if (resource.allowMultiple && !Array.isArray(appointmentResourceId)
    || !resource.allowMultiple && Array.isArray(appointmentResourceId)) {
      // throw error
      return acc;
    }

    if (resource.allowMultiple) {
      return [
        ...acc,
        ...(appointmentResourceId as Array<number | string>)
        .reduce((prevResources, itemId) => addResourceToAppointmentResources(
          plainResources, prevResources, resource, itemId,
        ) as Array<ValidResourceInstance>, [] as Array<ValidResourceInstance>),
      ];
    }

    return addResourceToAppointmentResources(
      plainResources, acc, resource, appointmentResourceId,
    ) as Array<ValidResourceInstance>;
  }, [] as Array<ValidResourceInstance>);
};

const addResourceToAppointmentResources: PureComputed<
  [Array<ValidResourceInstance>, Array<ValidResourceInstance>, ValidResource,
  number | string], Array<ValidResourceInstance>
> = (plainResources, appointmentResources, resource, resourceId) => {
  const currentResource = plainResources.find(
    plainItem => resource.fieldName === plainItem.fieldName && plainItem.id === resourceId,
  );

  return currentResource ? [
    ...appointmentResources,
    currentResource!,
  ] : appointmentResources;
};
