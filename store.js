import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./src/store/reducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 250 },
      serializableCheck: { warnAfter: 250 },
    }),
});
