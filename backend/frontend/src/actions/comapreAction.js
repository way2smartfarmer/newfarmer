import axios from 'axios';
import {
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
} from '../constants/CompareProducts';
export const addToCompare = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_COMPARE,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      cuttedPrice: data.product.cuttedPrice,
      image: data.product.images[0].url,
      ratings: data.product.ratings,
      reviews: data.product.numOfReviews,
    },
  });

  localStorage.setItem(
    'wishlistItems',
    JSON.stringify(getState().compare.compareItems)
  );
};
export const removeFromCompare = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_COMPARE,
    payload: id,
  });

  localStorage.setItem(
    'compareItems',
    JSON.stringify(getState().compare.compareItems)
  );
};
