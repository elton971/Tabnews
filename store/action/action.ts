import { APIErrorProps, ContentProps, User } from '../../constants/types';

export type Action =
  | { type: 'SET_CONTENT'; payload: ContentProps[] }
  | { type: 'SET_ERROR'; payload: APIErrorProps }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_STRATEGY'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_EXPANDED'; payload: boolean }
  | { type: 'SET_HEADER'; payload: string }
  | { type: 'SET_DATAUSER'; payload: User }
  | { type: 'SET_LOADING_MORE'; payload: boolean }
  | { type: 'SET_MODAL_VISIBLE'; payload: boolean };
