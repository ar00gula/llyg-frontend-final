import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer from '../features/reviews/reviewsSlice';

export default configureStore({
  reducer: {
    reviews: reviewsReducer,
  },
});
