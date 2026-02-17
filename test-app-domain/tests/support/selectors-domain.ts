/**
 * Domain-specific test selectors for the test application.
 */

import { testId } from './test-id';

export const itemsSelectors = {
  page: testId('items.list'),
  createButton: testId('items.create-button'),
  item: testId('items.item'),
  loading: testId('items.loading'),
  empty: testId('items.empty'),
  error: testId('items.error'),
  form: {
    container: testId('items.create.form'),
    name: testId('items.create.name'),
    description: testId('items.create.description'),
    submit: testId('items.create.submit'),
    cancel: testId('items.create.cancel'),
  },
};
