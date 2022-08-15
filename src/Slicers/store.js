import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlicer';
import configReducer from './configSlicer'
import feedReducer from  './feedSlicer'
import counterReducer from './counterSlicer'
import commentsReducer from './commentsSlicer'
export const store = configureStore({
  reducer: {
    user: userReducer,
    config : configReducer,
    feed:feedReducer,
    counter:counterReducer,
    comments:commentsReducer,
  },
});
