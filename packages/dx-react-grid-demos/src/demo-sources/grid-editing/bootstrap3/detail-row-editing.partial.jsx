// BLOCK:imports
import classNames from 'clsx';
import {
  Modal, Grid as BsGrid, Row, Col, ControlLabel, FormGroup, FormControl,
  ButtonToolbar, Button,
} from 'react-bootstrap';
// BLOCK:imports

// BLOCK:detailContent
function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

const DetailContent = ({
  row,
  processValueChange,
  applyChanges,
  cancelChanges,
}) => (
  <BsGrid>
    <Row>
      <Col sm={4} className="px-2">
        <FieldGroup
          name="prefix"
          label="Title"
          value={row.prefix || ''}
          onChange={processValueChange}
        />
      </Col>
      <Col sm={4} className="px-2">
        <FieldGroup
          name="firstName"
          label="First Name"
          value={row.firstName || ''}
          onChange={processValueChange}
        />
      </Col>
      <Col sm={4} className="px-2">
        <FieldGroup
          name="lastName"
          label="Last Name"
          value={row.lastName || ''}
          onChange={processValueChange}
        />
      </Col>
    </Row>
    <Row>
      <Col sm={4} className="px-2">
        <FieldGroup
          name="position"
          label="Position"
          value={row.position || ''}
          onChange={processValueChange}
        />
      </Col>
      <Col sm={4} className="px-2">
        <FieldGroup
          name="phone"
          label="Phone"
          value={row.phone || ''}
          onChange={processValueChange}
        />
      </Col>
      <Col sm={4} className="px-2">
        <FieldGroup
          name="address"
          label="Address"
          componentClass="textarea"
          rows={3}
          value={row.address || ''}
          onChange={processValueChange}
        />
      </Col>
    </Row>
    <Row>
      <Col className="pull-right">
        <ButtonToolbar>
          <Button onClick={applyChanges} bsStyle="primary">
            Save
          </Button>
          <Button onClick={cancelChanges}>
            Cancel
          </Button>
        </ButtonToolbar>
      </Col>
    </Row>
  </BsGrid>
);

const ToggleCell = ({
  expanded, onToggle,
  tableColumn, tableRow, row, style,
  ...restProps
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onToggle();
  };
  return (
    <td
      style={{
        cursor: 'pointer',
        verticalAlign: 'middle',
        textAlign: 'center',
        ...style,
      }}
      {...restProps}
    >
      <i
        className={classNames({
          glyphicon: true,
          'glyphicon-remove': expanded,
          'glyphicon-pencil': !expanded,
        })}
        onClick={handleClick}
      />
    </td>
  );
};
// BLOCK:detailContent
