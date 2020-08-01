import { applyMiddleware, compose, createStore } from "redux";
import createDebounce from "redux-debounced";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const middlewares = [thunk, createDebounce()];

const persistConfig = {
  key: 'auth',
  storage: storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
)

const persistor = persistStore(store);

export { persistor, store };

