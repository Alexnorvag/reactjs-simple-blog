const accessTokenName = 'accessToken';

export const setAccessToken = (accessToken: string): void => {
  localStorage.setItem(accessTokenName, accessToken);
};

export const getAccessToken = (): string|null => `Bearer ${localStorage.getItem(accessTokenName)}`;
