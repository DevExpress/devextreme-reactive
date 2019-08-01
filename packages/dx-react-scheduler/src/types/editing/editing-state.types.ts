import { PreCommitChanges, ChangeSet, AppointmentModel } from '../index';

export interface EditingStateProps {
  /** The identifier of an appointment being edited. */
  editingAppointmentId?: number | string;
  /** The initial value of the editingAppointmentId property in uncontrolled mode. */
  defaultEditingAppointmentId?: number | string;
  /** Handles changes to the editingAppointmentId property value. */
  onEditingAppointmentIdChange?: (editingAppointmentId: number | string) => void;
  /** A created but not committed appointment. */
  addedAppointment?: object;
  /** The initial value of the addedAppointment property in uncontrolled mode. */
  defaultAddedAppointment?: object;
  /** Handles changes to the addedAppointment property value. */
  onAddedAppointmentChange?: (addedAppointment: object) => void;
  /** Uncommitted appointment changes. */
  appointmentChanges?: { [key: string]: object };
  /** The initial value of the appointmentChanges property in uncontrolled mode. */
  defaultAppointmentChanges?: { [key: string]: object };
  /** Handles changes to the appointmentChanges property value. */
  onAppointmentChangesChange?: (appointmentChanges: { [key: string]: any }) => void;
  /** Handles commiting appointment changes. */
  onCommitChanges: (changes: ChangeSet) => void;
  /** Handles commiting appointment changes. */
  preCommitChanges: PreCommitChanges;
}

/** @internal */
export type EditingStateState = {
  editingAppointment: Partial<AppointmentModel>;
  addedAppointment: { [key: string]: object };
  appointmentChanges: { [key: string]: object };
};
