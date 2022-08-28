import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const FeildTypes = ["Text", "Checkbox", "Date", "Number"];

type FieldType = "Text" | "Checkbox" | "Date" | "Number";

export type AttributeType = {
  id: string;
  name?: string;
  type?: FieldType;
};

export type MachineType = {
  id: string;
  title?: string;
  titleFeild?: string;
  attributes?: Array<AttributeType>;
};

const typeSlice = createSlice({
  name: "types",
  initialState: [] as Array<MachineType>,
  reducers: {
    createType(
      state,
      action: {
        payload: {
          id: string;
        };
      }
    ) {
      state.push({
        id: action.payload.id,
        attributes: [
          {
            id: uuidv4(),
            name: "Title",
            type: "Text",
          },
        ],
      });
    },
    addAttribute(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = {
        ...state[index],
        attributes: [
          ...(state[index]?.attributes || []),
          {
            id: uuidv4(),
            name: "",
            type: action.payload.feildType,
          },
        ],
      };
    },
    removeAttribute(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      const indexToRemove = state[index].attributes?.findIndex(
        (item) => item.id === action.payload.attributeId
      );
      if (indexToRemove != null && indexToRemove > -1) {
        state[index].attributes?.splice(indexToRemove, 1);
      }
    },
    updateTypeName(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index].title = action.payload.name;
    },
    updateTitleField(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index].titleFeild = action.payload.name;
    },
    updateAttributeItem(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      const attrIndex = state[index].attributes?.findIndex(
        (i) => i.id === action.payload.attributeId
      );
      const attributes = state[index].attributes;
      if (attrIndex != null && attrIndex > -1 && attributes !== undefined) {
        if (action.payload.type) {
          attributes[attrIndex].type = action.payload.type;
        }
        if (action.payload.name) {
          attributes[attrIndex].name = action.payload.name;
        }
      }
    },
    updateType(state, action) {},
    deleteType(state, action) {
      state.splice(
        state.findIndex((item) => item.id === action.payload.id),
        1
      );
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = typeSlice;
// Extract and export each action creator by name
export const {
  createType,
  updateType,
  deleteType,
  addAttribute,
  removeAttribute,
  updateTypeName,
  updateTitleField,
  updateAttributeItem,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
