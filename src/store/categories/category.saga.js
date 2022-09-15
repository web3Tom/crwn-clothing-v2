import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './categories.action';

import { CATEGORIES_ACTION_TYPES } from './categories.types';

//Generator Effect Saga
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(
      getCategoriesAndDocuments,
      'cateogories'
    );
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

//Saga
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

//Saga Aggregator
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
