import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import signUpReducer from './reducers/signUpReducer';
import addPostReducer from './reducers/addPostReducer';

const rootReducer = combineReducers({
  userList: signUpReducer,
  postList: addPostReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

// persist reducer
const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);
