import { APIErrorProps, ContentProps, User } from '../../constants/types';

export type StateHome = {
  content: ContentProps[];
  error: APIErrorProps | null;
  loading: boolean;
  strategy: string;
  page: number;
  expanded: boolean;
  header:string;
  user_data:User | null;
  loading_more:boolean;
  modalVisible:boolean;
};

export const initialState: StateHome = {
  content: [],
  error: null,
  loading: false,
  strategy: 'new',
  page: 1,
  expanded: false,
  header:'',
  user_data: null,
  loading_more:false,
  modalVisible:false,
};
