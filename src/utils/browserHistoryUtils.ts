import browserHistory from '../constants/history';
import { buildQueryString } from './queryStringUtils';

/**
 * Updates the Browser history search value
 * @param search
 */
// eslint-disable-next-line import/prefer-default-export
export const updateSearch = (search: { [key: string]: string|number|boolean}) => {
  browserHistory.push({ search: buildQueryString(search, browserHistory.location.search) });
};
