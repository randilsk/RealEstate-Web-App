// src/redux/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createWrapper } from 'next-redux-wrapper';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store function for Next.js wrapper
const makeStore = () => 
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  });

// Create store instance
export const store = makeStore();
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Create and export Next.js wrapper
export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === 'development' });