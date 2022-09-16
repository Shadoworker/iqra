import { legacy_createStore, combineReducers,applyMiddleware } from 'redux';
import mainReduxReducer from './mainRedux/mainReduxReducer';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
    // whitelist: ['bookmarks']
  };

const rootReducer = combineReducers(
{ mainReduxState: persistReducer(persistConfig, mainReduxReducer) }
);
    
 
const configureStore = () => {
return legacy_createStore(rootReducer, applyMiddleware(thunk));
}

const persistConfiguredStore = (_store) => {
        persistStore(_store);
    }

const store = {configureStore, persistStore}

export default store;