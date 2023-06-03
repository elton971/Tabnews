import { createSlice } from "@reduxjs/toolkit";
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

interface initialStateProps {
  content: ContentState[];
  loading: Boolean;
}

const initialState: initialStateProps = {
  content: [],
  loading: false,
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
  },
});

export const { setContent, setLoading } = contentSlice.actions;
export default contentSlice.reducer;
