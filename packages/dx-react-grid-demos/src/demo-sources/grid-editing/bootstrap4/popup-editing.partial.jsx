// BLOCK:imports
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Container, Row, Col, Label, FormGroup, Input,
} from 'reactstrap';
// BLOCK:imports

// BLOCK:dialog
function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input {...props} />
    </FormGroup>
  );
}

const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}) => (
  <Modal isOpen={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
    <ModalHeader id="form-dialog-title">
      Employee Details
    </ModalHeader>
    <ModalBody>
      <Container>
        <Row>
          <Col sm={6} className="px-2">
            <FieldGroup
              name="firstName"
              label="First Name"
              value={row.firstName}
              onChange={onChange}
            />
          </Col>
          <Col sm={6} className="px-2">
            <FieldGroup
              name="lastName"
              label="Last Name"
              value={row.lastName}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6} className="px-2">
            <FieldGroup
              name="prefix"
              label="Title"
              value={row.prefix}
              onChange={onChange}
            />
          </Col>
          <Col sm={6} className="px-2">
            <FieldGroup
              type="date"
              name="birthDate"
              label="Birth Date"
              value={row.birthDate}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6} className="px-2">
            <FieldGroup
              name="position"
              label="Position"
              value={row.position}
              onChange={onChange}
            />
          </Col>
          <Col sm={6} className="px-2">
            <FieldGroup
              name="phone"
              label="Phone"
              value={row.phone}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Container>
    </ModalBody>
    <ModalFooter>
      <Button onClick={onCancelChanges} color="secondary">
        Cancel
      </Button>
      {' '}
      <Button onClick={onApplyChanges} color="primary">
        Save
      </Button>
    </ModalFooter>
  </Modal>
);
// BLOCK:dialog
