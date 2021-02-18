const storedFields = ['accessToken', 'refreshToken', 'currentUserName', 'currentUserId'] as const;

type StoredField = typeof storedFields[number];

/**
 * Saves passed data to the Local Storage
 * @param fieldNameOrConfig
 * @param value
 */
export const writeToLocalStorage = (
  fieldNameOrConfig: StoredField|{ [fieldName in StoredField]: string },
  value?: any,
): void => {
  if (typeof fieldNameOrConfig === 'string') {
    localStorage.setItem(fieldNameOrConfig, value);
  } else {
    Object.keys(fieldNameOrConfig).forEach(
      (fieldName: string) => localStorage.setItem(
        fieldName,
        fieldNameOrConfig[fieldName as StoredField],
      ),
    );
  }
};

/**
 * Retrieves field value from the Local Storage
 * @param fieldName
 */
export const readFromLocalStorage = (
  fieldName: StoredField,
): string|null => localStorage.getItem(fieldName);

export const clearLocalStorage = (): void => {
  storedFields.forEach(
    (fieldName: StoredField) => localStorage.removeItem(fieldName),
  );
};

export const getAccessToken = (): string|null => {
  const token: string|null = readFromLocalStorage('accessToken');

  return token ? `Bearer ${token}` : null;
};
