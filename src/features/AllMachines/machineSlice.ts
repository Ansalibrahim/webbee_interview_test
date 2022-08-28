import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Machine = {
  id: string;
  [key: string]: string;
};

export const slice = createSlice({
  name: "machines",
  initialState: [] as Array<Machine>,
  reducers: {
    createMachine(state, action) {
      state.push({
        id: uuidv4(),
        typeId: action.payload.id,
      });
    },
    updateMachine(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      const item = state[index];
      item[action.payload.feildId] = action.payload.value;
    },
    removeMachine(state, action) {
      state.splice(
        state.findIndex((item) => item.id === action.payload.id),
        1
      );
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = slice;
// Extract and export each action creator by name
export const { createMachine, updateMachine, removeMachine } = actions;
// Export the reducer, either as a default or named export
export default reducer;
