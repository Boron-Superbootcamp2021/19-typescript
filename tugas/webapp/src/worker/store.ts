import {
  createAction,
  createReducer,
  configureStore,
} from '@reduxjs/toolkit';
import {
  initialState,
  error,
  loading,
  registered,
  removed,
  workersLoaded,
  clearError,
} from './reducer';
const thunkMiddleware = require('redux-thunk');

enum ActionType {
  ERROR = 'error',
  LOADING = 'loading',
  REGISTERED = 'registered',
  REMOVED ='removed' ,
  WORKERS_LOADED = 'workersLoaded',
  CLEAR_ERROR = 'clearError',
}

export const errorAction = createAction<string>(ActionType.ERROR);
export const loadingAction = createAction(ActionType.ERROR);
export const registeredAction = createAction<Worker>(ActionType.ERROR);
export const removedAction = createAction<number>(ActionType.ERROR);
export const workersLoadedAction = createAction<Worker>(ActionType.ERROR);
export const clearErrorAction = createAction(ActionType.ERROR);

const reducer = createReducer(initialState, {
  [ActionType.ERROR]: error,
  [ActionType.CLEAR_ERROR]: clearError,
  [ActionType.LOADING]: loading,
  [ActionType.REGISTERED]: registered,
  [ActionType.REMOVED]: removed,
  [ActionType.WORKERS_LOADED]: workersLoaded,
});

export const store$ = configureStore({
  reducer,
  middleware: [thunkMiddleware.default],
});
