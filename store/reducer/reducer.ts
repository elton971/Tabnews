import { StateHome } from '../state/state';
import { Action } from '../action/action';

export const reducerHome = (state: StateHome, action: Action): StateHome => {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: [...state.content, ...action.payload] };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_STRATEGY':
      return { ...state, strategy: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_EXPANDED':
      return { ...state, expanded: action.payload };
    case 'SET_HEADER':
      return { ...state, header: action.payload };
    case 'SET_DATAUSER':
      return { ...state, user_data: action.payload };
    case 'SET_LOADING_MORE':
      return { ...state, loading_more: action.payload };
    case 'SET_MODAL_VISIBLE':
      return { ...state, modalVisible: action.payload };
    default:
      return state;
  }
};
