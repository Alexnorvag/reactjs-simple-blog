/**
 * Builds query string based on passed params
 * @param search
 * @param initialValue
 * @param skipExisted
 */
export const buildQueryString = (
  search: { [key: string]: string|number|boolean},
  initialValue: string = '',
  skipExisted: boolean = false,
): string => {
  const searchParams: URLSearchParams = new URLSearchParams(initialValue);

  Object.keys(search).forEach((paramKey: string): void => {
    if (!(skipExisted && searchParams.has(paramKey))) {
      const value = search[paramKey].toString();

      if (!value) {
        searchParams.delete(paramKey);
      } else {
        searchParams.set(paramKey, value);
      }
    }
  });

  return `?${searchParams.toString()}`;
};

/**
 * Retrieves the query string param value
 * @param queryString
 * @param name
 */
export const readFromQueryString = (
  queryString: string,
  name: string,
) => new URLSearchParams(queryString).get(name);
