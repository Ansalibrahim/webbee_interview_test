import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Panel,
  Dropdown,
  Checkbox,
  InputNumber,
  DatePicker,
  Button,
} from "rsuite";
import { FlexboxGrid, Col } from "rsuite";
import { RootState } from "../../store";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import CloseIcon from "@rsuite/icons/Close";
import {
  createMachine,
  Machine,
  removeMachine,
  updateMachine,
} from "./machineSlice";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

function AllMachines() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const types = useSelector((state: RootState) => state.types);
  const allMachines = useSelector((state: RootState) => state.machines);
  const addMachine = (dItemId: string) => {
    dispatch(createMachine({ id: dItemId }));
  };
  const machines = useMemo(() => {
    if (!id) return allMachines;
    return allMachines.filter((item) => item.typeId === id);
  }, [allMachines, id]);

  return (
    <FlexboxGrid style={{ margin: 10 }}>
      {machines?.map((item: Machine) => (
        <MachineForm item={item} />
      ))}
      <Col md={6} style={{ marginLeft: 10 }}>
        {!id ? (
          <Dropdown title="Add Item">
            {types.map((dItem) => (
              <Dropdown.Item onClick={() => addMachine(dItem.id)}>
                {dItem?.title}
              </Dropdown.Item>
            ))}
          </Dropdown>
        ) : (
          <Button onClick={() => addMachine(id)} style={{ width: "100%" }}>
            Add Item
          </Button>
        )}
      </Col>
    </FlexboxGrid>
  );
}

export default AllMachines;

function MachineForm({ item }: { item: Machine }) {
  const dispatch = useDispatch();
  const typeInfo = useSelector((state: RootState) =>
    state.types.find((i) => item.typeId === i.id)
  );

  return (
    <Col>
      <Panel
        header={
          <FlexboxGrid justify="space-between">
            <FlexboxGridItem>
              {`${typeInfo?.title ? typeInfo?.title : "Title"} - ${
                typeInfo?.titleFeild && item[typeInfo?.titleFeild]
                  ? item[typeInfo?.titleFeild]
                  : ""
              }`}
            </FlexboxGridItem>
            <FlexboxGridItem>
              <CloseIcon
                onClick={() => dispatch(removeMachine({ id: item.id }))}
              ></CloseIcon>
            </FlexboxGridItem>
          </FlexboxGrid>
        }
        bordered
        style={{ display: "inline-block" }}
      >
        <Form>
          {typeInfo?.attributes?.map((typeItem) => {
            if (typeItem.type === "Text") {
              return (
                <Form.Group controlId={typeItem.id}>
                  <Form.ControlLabel>{typeItem.name}</Form.ControlLabel>
                  <Form.Control
                    name={typeItem.id}
                    value={item[typeItem.id]}
                    onChange={(value: string) => {
                      dispatch(
                        updateMachine({
                          id: item.id,
                          feildId: typeItem.id,
                          value: value,
                        })
                      );
                    }}
                  />
                </Form.Group>
              );
            }
            if (typeItem.type === "Date") {
              return (
                <Form.Group controlId={typeItem.id}>
                  <Form.ControlLabel>{typeItem.name}</Form.ControlLabel>
                  <DatePicker
                    style={{ width: "100%", display: "block" }}
                    name={typeItem.id}
                    value={
                      item[typeItem.id] ? new Date(item[typeItem.id]) : null
                    }
                    onChange={(value: Date | null) => {
                      if (value)
                        dispatch(
                          updateMachine({
                            id: item.id,
                            feildId: typeItem.id,
                            value: value?.toISOString(),
                          })
                        );
                    }}
                  />
                </Form.Group>
              );
            }
            if (typeItem.type === "Checkbox") {
              return (
                <Form.Group controlId={typeItem.id}>
                  <Form.Control
                    name={typeItem.id}
                    value={item[typeItem.id]}
                    accepter={Checkbox}
                    defaultChecked={!!item[typeItem.id]}
                    onChange={(value: any, checked: any) => {
                      dispatch(
                        updateMachine({
                          id: item.id,
                          feildId: typeItem.id,
                          value: checked,
                        })
                      );
                    }}
                  >
                    <Form.ControlLabel>{typeItem.name}</Form.ControlLabel>
                  </Form.Control>
                </Form.Group>
              );
            }
            return (
              <Form.Group controlId={typeItem.id}>
                <Form.ControlLabel>{typeItem.name}</Form.ControlLabel>
                <Form.Control
                  name={typeItem.id}
                  value={item[typeItem.id]}
                  accepter={InputNumber}
                  onChange={(value: string) => {
                    dispatch(
                      updateMachine({
                        id: item.id,
                        feildId: typeItem.id,
                        value: value,
                      })
                    );
                  }}
                />
              </Form.Group>
            );
          })}
        </Form>
      </Panel>
    </Col>
  );
}
