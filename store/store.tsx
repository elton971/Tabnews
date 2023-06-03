import { configureStore } from "@reduxjs/toolkit";
import ContentReducer from "./slice/Content.slice";
const store = configureStore({
  reducer: {
    content: ContentReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
