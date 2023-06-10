import { configureStore } from "@reduxjs/toolkit";
import ContentReducer from "./slice/Content.slice";
import AuthReducer from "./slice/Auth.slice";
const store = configureStore({
  reducer: {
    content: ContentReducer,
    auth: AuthReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
