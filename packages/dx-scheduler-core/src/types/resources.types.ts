import { PureComputed } from '@devexpress/dx-core';
import { Appointment } from './../index';

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
  color?: string | Color;
  /** Specifies the resource item's text that would be used in UI */
  text?: string;
};
/** Specifies the resources palette. */
export type Palette = Array<string | Color>;

/** Specifies the color object. */
export interface Color {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

/** The resource item with all properties. */
export type ValidResourceItem = {
  /**
   * Specifies a resource item's identifier.
   * This id should be related with scheduler's data `fieldName` id.
   */
  id: number | string;
  /**
   * Specifies resource item's color.
   * It is used to indicate appointments related to this resource.
   */
  color: string | Color;
  /** Specifies the resource item's text that would be used in UI */
  text: string;
  /** Specifies the resource title. */
  title: string;
  /** The name of the appointment object field that specifies a resource of this kind. */
  fieldName: string;
  /** Indicates whether or not several resources of this kind can be assigned to an appointment. */
  allowMultiple?: boolean;
  /** Specifies the main resource kind */
  isMain: boolean;
};

/** The resource with all properties. */
export type ValidResource = {
  /** The name of the appointment object field that specifies a resource of this kind. */
  fieldName: string;
  /** Specifies the resource title. */
  title: string;
  /** Indicates whether or not several resources of this kind can be assigned to an appointment. */
  allowMultiple: boolean;
  /** Specifies an array of resource item objects. */
  items: Array<ValidResourceItem>;
  /** Specifies the main resource kind */
  isMain: boolean;
};

/** @internal */
export type GetAppointmentResources = PureComputed<
  [Appointment, Array<ValidResource>, Array<ValidResourceItem>], Array<ValidResourceItem>
>;

/** @internal */
export type ConvertResourcesToPlain = PureComputed<
  [Array<ValidResource>], Array<ValidResourceItem>
>;

/** @internal */
export type ValidateResources = PureComputed<
  [Array<Resource>, string | undefined, Palette], Array<ValidResource>
>;
