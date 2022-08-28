import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import typesReducer from "../features/ManageTypes/typeSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import MachinesReducer from "../features/AllMachines/machineSlice";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  types: typesReducer,
  machines: MachinesReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
