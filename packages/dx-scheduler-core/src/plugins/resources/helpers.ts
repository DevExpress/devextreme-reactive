import { AttachResources } from '../../types';

export const attachResources: AttachResources = (
  appointment, resources, plainResources,
) => {
  if (!resources || resources.length === 0) return appointment;

  const appointmentResources = resources.reduce((acc, resource) => {
    const appointmentResourceId = appointment[resource.fieldName]; // dataItem
    if (appointmentResourceId === undefined) return acc;

    // Array<number>
    if (resource.allowMultiple && !Array.isArray(appointmentResourceId)
    || !resource.allowMultiple && Array.isArray(appointmentResourceId)) {
      // error
      return acc;
    }

    if (resource.allowMultiple) {
      return [
        ...acc,
        ...appointmentResourceId.map(itemId => plainResources.find(
          plainItem => resource.fieldName === plainItem.fieldName && plainItem.id === itemId),
        ),
      ];
    }
    // number
    return [
      ...acc,
      ...plainResources.find(plainItem => resource.fieldName === plainItem.fieldName && plainItem.id === appointmentResourceId),
    ];
  }, []);

  return {
    ...appointment,
    ...appointmentResources.length > 0 && {
      resources: appointmentResources,
    },
  };
};
