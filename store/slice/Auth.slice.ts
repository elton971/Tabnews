import { createSlice } from "@reduxjs/toolkit";

interface UserProps {
  id: string;
  username: string;
  email: string;
  notifications: boolean;
  features: string[];
  tabcoins: number;
  tabcash: number;
  created_at: string;
  updated_at: string;
}

interface initialStateProps {
  user: UserProps;
  token: string;
}

const initialState: initialStateProps = {
  user: {
    id: "",
    username: "",
    email: "",
    notifications: false,
    features: [],
    tabcoins: 0,
    tabcash: 0,
    created_at: "",
    updated_at: "",
  },
  token: "",
};

const AuthSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUserData, setToken } = AuthSlice.actions;
export default AuthSlice.reducer;
