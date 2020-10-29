// BLOCK:imports
import {
  Grid as BsGrid, Row, Col, ControlLabel, FormGroup, FormControl,
  Button, Modal,
} from 'react-bootstrap';
// BLOCK:imports

// BLOCK:dialog
function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
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
  <Modal show={open} onHide={onCancelChanges} aria-labelledby="form-dialog-title">
    <Modal.Header id="form-dialog-title">
      <Modal.Title>
        Employee Details
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <BsGrid fluid>
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
      </BsGrid>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onCancelChanges} color="secondary">
        Cancel
      </Button>
      {' '}
      <Button onClick={onApplyChanges} color="primary">
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);
// BLOCK:dialog
