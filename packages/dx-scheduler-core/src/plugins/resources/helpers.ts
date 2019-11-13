import { GetAppointmentResources, ValidResourceInstance } from '../../types';

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
        ...(appointmentResourceId as Array<number | string>).map(itemId => plainResources.find(
          plainItem => resource.fieldName === plainItem.fieldName && plainItem.id === itemId),
        ),
      ];
    }

    return [
      ...acc,
      ...(plainResources as Array<any>).find(plainItem =>
        resource.fieldName === plainItem.fieldName && plainItem.id === appointmentResourceId,
      ),
    ];
  }, [] as Array<ValidResourceInstance>);
};
