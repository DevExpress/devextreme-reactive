import { PureComputed } from '@devexpress/dx-core';
import { Appointment } from './../index';

export type PlainResourceItem = {
  /**
   * Specifies a resource item's identifier.
   * This id should be related with scheduler's data `fieldName` id.
   */
  id: number | string;
  /**
   * Specifies resource item's color.
   * It is used to indicate appointments related to this resource.
   */
  color: string;
  /** Specifies the resource item's text that would be used in UI */
  text: string;
  /** The name of the appointment object field that specifies a resource of this kind. */
  fieldName: string;
  /** Specifies the resource title. */
  title: string;
  /** Indicates whether or not several resources of this kind can be assigned to an appointment. */
  allowMultiple: boolean;
  /** Specifies whether resource is main */
  isMain: boolean;
};

/** Specifies the resource item object. */
export type ResourceItem = {
  /**
   * Specifies a resource item's identifier.
   * This id should be related with scheduler's data `fieldName` id.
   */
  id: number | string;
  /**
   * Specifies resource item's color.
   * It is used to indicate appointments related to this resource.
   */
  color?: string;
  /** Specifies the resource item's text that would be used in UI */
  text?: string;
};

/** Specifies a resource that available in scheduler. */
export type Resource = {
  /** The name of the appointment object field that specifies a resource of this kind. */
  fieldName: string;
  /** Specifies the resource title. */
  title?: string;
  /** Indicates whether or not several resources of this kind can be assigned to an appointment. */
  allowMultiple?: boolean;
  /** Specifies an array of resource item objects. */
  items: Array<ResourceItem>;
};

export interface AppointmentWithResources extends Appointment {
  resources: PlainResourceItem;
}

/** @internal */
export type AttachResourcesComputed = PureComputed<
  [Array<Appointment>, Array<Resource>, string | undefined], Array<AppointmentWithResources>
>;

/** @internal */
export type AttachResources = PureComputed<
  [Appointment, Array<Resource>, string | undefined], AppointmentWithResources
>;

/** @internal */
export type convertResourcesToPlain = PureComputed<
  [Array<Resource>, string | undefined], Array<PlainResourceItem>
>;
