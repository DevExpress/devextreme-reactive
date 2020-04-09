// BLOCK:imports
import classNames from 'clsx';
import {
  Container, Row, Col, Label, FormGroup, Input, Button,
} from 'reactstrap';
// BLOCK:imports

// BLOCK:detailContent
function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input {...props} />
    </FormGroup>
  );
}

const DetailContent = ({ row, ...rest }) => {
  const {
    processValueChange,
    applyChanges,
    cancelChanges,
  } = rest;
  return (
    <Container>
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
            rows={3}
            value={row.address || ''}
            onChange={processValueChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="float-right">
            <Button onClick={applyChanges} color="primary">
              Save
            </Button>{' '}
            <Button onClick={cancelChanges}>
              Cancel
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

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
          oi: true,
          'oi-x': expanded,
          'oi-pencil': !expanded,
        })}
        onClick={handleClick}
      />
    </td>
  );
};
// BLOCK:detailContent