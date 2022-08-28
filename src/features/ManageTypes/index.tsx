import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Panel,
  SelectPicker,
  Dropdown,
  Row,
  Input,
} from "rsuite";
import { FlexboxGrid, Col } from "rsuite";
import {
  addAttribute,
  createType,
  deleteType,
  FeildTypes,
  MachineType,
  removeAttribute,
  updateTypeName,
  updateTitleField,
  updateAttributeItem,
} from "./typeSlice";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../store";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import CloseIcon from "@rsuite/icons/Close";

function ManageTypes() {
  const dispatch = useDispatch();
  const types = useSelector((state: RootState) => state.types);
  const addType = async () => {
    await dispatch(createType({ id: uuidv4() }));
  };

  return (
    <FlexboxGrid style={{ margin: 10 }}>
      {types.map((item) => (
        <TypesForm item={item} />
      ))}
      <Col md={6} style={{ marginLeft: 10 }}>
        <Button onClick={addType} style={{ width: "100%" }}>
          Add Type
        </Button>
      </Col>
    </FlexboxGrid>
  );
}

export default ManageTypes;

function TypesForm({ item }: { item: MachineType }) {
  const dispatch = useDispatch();
  const removeType = async (id: string) => {
    await dispatch(deleteType({ id }));
  };
  const addAttributeItem = (id: string, feildType: string) => {
    dispatch(addAttribute({ id, feildType }));
  };
  const deleteAttribute = (id: string, attributeId: string) => {
    dispatch(removeAttribute({ id, attributeId }));
  };
  const selectData = item.attributes
    ? item.attributes
        .filter((i) => !!i.name)
        .map((attr) => ({
          label: attr.name,
          value: attr.id,
        }))
    : [];

  const onTypeNameChange = (event: any) => {
    dispatch(updateTypeName({ name: event, id: item.id }));
  };

  const onSelectTypeTitle = (event: any) => {
    dispatch(updateTitleField({ name: event, id: item.id }));
  };

  return (
    <Col>
      <Panel
        header={
          <FlexboxGrid justify="space-between">
            <FlexboxGridItem>
              {item.title ? item.title : "Title"}
            </FlexboxGridItem>
            <FlexboxGridItem>
              <CloseIcon onClick={() => removeType(item.id)}></CloseIcon>
            </FlexboxGridItem>
          </FlexboxGrid>
        }
        bordered
        style={{ display: "inline-block" }}
      >
        <Form>
          <Form.Group controlId="type">
            <Form.ControlLabel>Object type</Form.ControlLabel>

            <Input
              style={{ width: `100%` }}
              name="type"
              value={item.title}
              onChange={onTypeNameChange}
            />
          </Form.Group>

          <Form.Group controlId="title">
            <Form.ControlLabel>SelectPicker:</Form.ControlLabel>

            <SelectPicker
              name="title"
              data={selectData}
              onSelect={onSelectTypeTitle}
              value={item.titleFeild}
              cleanable={false}
              style={{ width: `100%` }}
            />
          </Form.Group>

          <Form.Group controlId="Feilds">
            {item?.attributes?.map((attribute) => (
              <Row>
                <Form.Control
                  name="attribute.name"
                  onChange={(value: string) => {
                    dispatch(
                      updateAttributeItem({
                        name: value,
                        id: item.id,
                        attributeId: attribute.id,
                      })
                    );
                  }}
                  value={attribute.name}
                />
                <Form.Control
                  style={{ width: 100 }}
                  name="attribute.type"
                  accepter={SelectPicker}
                  data={FeildTypes.map((i) => ({ label: i, value: i }))}
                  value={attribute.type}
                  cleanable={false}
                  onSelect={(selected: any) => {
                    dispatch(
                      updateAttributeItem({
                        type: selected,
                        id: item.id,
                        attributeId: attribute.id,
                      })
                    );
                  }}
                />
                <CloseIcon
                  style={{ marginLeft: 10 }}
                  onClick={() => deleteAttribute(item.id, attribute.id)}
                ></CloseIcon>
              </Row>
            ))}
          </Form.Group>
          <Dropdown title="Add Feild">
            {FeildTypes.map((dItem) => (
              <Dropdown.Item onClick={() => addAttributeItem(item.id, dItem)}>
                {dItem}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </Form>
      </Panel>
    </Col>
  );
}
