import { createSlice } from "@reduxjs/toolkit";
import { on } from "events";
export interface ContentState {
  id: string;
  owner_id: string;
  parent_id: string | null;
  slug: string;
  title: string;
  status: string;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: string | null;
  tabcoins: number;
  owner_username: string;
  children_deep_count: number;
}
interface InfoState {
  message: string;
  visible: boolean;
}

interface initialStateProps {
  content: ContentState[];
  loading: Boolean;
  infoModal: InfoState;
}

const initialState: initialStateProps = {
  content: [],
  loading: false,
  infoModal: {
    message: "",
    visible: false,
  },
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProblem: (state, action) => {
      state.infoModal = action.payload;
      console.log(state.infoModal);
    },
  },
});

export const { setContent, setLoading, setProblem } = contentSlice.actions;
export default contentSlice.reducer;
